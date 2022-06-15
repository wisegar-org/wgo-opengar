import { DataSource } from "typeorm";
import {
  IAuthEditParams,
  IAuthLoginParams,
  IAuthMeParams,
  IAuthModelArg,
  IAuthRegisterParams,
  IAuthResendParam,
  IChangePasswordParam,
  ISuccesLogin,
  TOKEN_EXP,
  TOKEN_REGISTER_EXP,
  WRONG_COONFIRM_EMAIL,
  WRONG_EMAIL,
  WRONG_REGISTER,
  WRONG_TOKEN,
  WRONG_USER_DONT_EXIST,
  WRONG_USER_PASSWORD,
} from ".";
import { UserEntity } from "../database/entities/UserEntity";
import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";
import * as bcrypt from "bcrypt";
import {
  generateAccessToken,
  validateAccessToken,
} from "@wisegar-org/wgo-server";
import { IUser } from "../../../wgo-base/core/models/user";
import { EmailServer } from "@wisegar-org/wgo-mailer";
import { AuthPaths } from "../router";

export class AuthModel {
  private dataSource: DataSource;
  private emailService: EmailServer;
  private options: IAuthModelArg;
  /**
   *
   */
  constructor(options: IAuthModelArg) {
    this.dataSource = options.dataSource;
    this.options = {
      ...options,
      tokenExpiresIn: options.tokenExpiresIn || TOKEN_EXP,
      tokenRegisterExpiresIn:
        options.tokenRegisterExpiresIn || TOKEN_REGISTER_EXP,
    };
    this.emailService = new EmailServer();
  }

  public async login(data: IAuthLoginParams): Promise<ISuccesLogin> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ userName: data.user }, { email: data.user }],
    });

    if (!IsNullOrUndefined(user)) {
      if (user && !user.isEmailConfirmed) {
        throw new Error(WRONG_COONFIRM_EMAIL);
      }
      if (user && (await this.comparePassword(data.password, user.password))) {
        const token = generateAccessToken({
          privateKey: this.options.privateKey,
          expiresIn: TOKEN_EXP,
          payload: {
            userId: user.id.toString(),
            userName: user.userName,
            sessionId: -1,
          },
        });
        return {
          token,
          user: this.mapUserEntity(user),
        };
      }
    }

    throw new Error(WRONG_USER_PASSWORD);
  }

  public async me(data: IAuthMeParams): Promise<IUser> {
    const result = validateAccessToken({
      publicKey: this.options.publicKey,
      token: data.token,
      expiresIn: TOKEN_EXP,
      privateKey: this.options.privateKey,
    });

    if (!!result) {
      const repo = await this.dataSource.getRepository(UserEntity);
      const user = await repo.findOne({
        where: [{ userName: result.userName }, { id: parseInt(result.userId) }],
      });
      if (!!user) {
        return this.mapUserEntity(user);
      }
    }

    throw new Error(WRONG_TOKEN);
  }

  public async register(data: IAuthRegisterParams): Promise<IUser> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const listUsers = await repo.find({
      where: [{ userName: data.userName }, { email: data.email }],
    });
    if (listUsers.length > 0) {
      throw new Error(WRONG_EMAIL);
    }

    let user = new UserEntity();
    user.name = data.name;
    user.lastName = data.lastName;
    user.userName = data.userName;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 10);
    user.isEmailConfirmed = data.isEmailConfirmed;

    user = await repo.save(user);
    if (user) {
      if (!user.isEmailConfirmed) {
        await this.resendConfirmation(data);
      }
      return this.mapUserEntity(user);
    }
    throw new Error(WRONG_REGISTER);
  }

  public async editUser(data: IAuthEditParams): Promise<IUser> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ id: data.id }],
    });
    if (user) {
      user.name = data.name;
      user.lastName = data.lastName;
      if (data.password) user.password = bcrypt.hashSync(data.password, 10);
      const result = await repo.save(user);
      return this.mapUserEntity(result);
    }
    throw new Error(WRONG_USER_DONT_EXIST);
  }

  public async resendConfirmation(data: IAuthResendParam): Promise<IUser> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ email: data.email }],
    });
    if (user) {
      user.confirmationToken = generateAccessToken({
        privateKey: this.options.privateKey,
        expiresIn: TOKEN_REGISTER_EXP,
        payload: {
          userId: user.id.toString(),
          userName: user.userName,
          sessionId: -1,
        },
      });
      user.isEmailConfirmed = false;
      await repo.save(user);
      await this.emailService.send({
        ...this.options.emailOptions,
        subject: "Wisegar Email Confirmation",
        to: `${data.email}`,
        html: `<div>
          Confirm email <a href="${this.options.hostBase}/#${AuthPaths.authConfirmEmail.path}?token=${user.confirmationToken}"> here </a>
          </div>`,
      });
      return this.mapUserEntity(user);
    }

    throw new Error(WRONG_USER_DONT_EXIST);
  }

  public async resetPassword(data: IAuthResendParam): Promise<boolean> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ userName: data.email }, { email: data.email }],
    });

    if (!IsNullOrUndefined(user) && user) {
      const token = generateAccessToken({
        privateKey: this.options.privateKey,
        expiresIn: TOKEN_REGISTER_EXP,
        payload: {
          userId: user.id.toString(),
          userName: user.userName,
          sessionId: -1,
        },
      });
      await this.emailService.send({
        ...this.options.emailOptions,
        subject: "Wisegar Email Reset Password",
        to: `${data.email}`,
        html: `<div>
          To reset the password click <a href="${this.options.hostBase}/#${AuthPaths.authChangePassword.path}?token=${token}"> here </a>
          </div>`,
      });
      return true;
    }

    throw new Error(WRONG_USER_DONT_EXIST);
  }

  public async changePassword(data: IChangePasswordParam) {
    const tokenValidation = validateAccessToken({
      publicKey: this.options.publicKey,
      token: data.token,
      expiresIn: TOKEN_EXP,
      privateKey: this.options.privateKey,
    });

    if (tokenValidation) {
      const repo = await this.dataSource.getRepository(UserEntity);
      const user = await repo.findOne({
        where: [{ id: parseInt(tokenValidation.userId) }],
      });
      if (user) {
        user.password = bcrypt.hashSync(data.password, 10);
        const result = await repo.save(user);
        return !!result;
      } else {
        throw new Error(WRONG_USER_DONT_EXIST);
      }
    }

    throw new Error(WRONG_TOKEN);
  }

  public async confirmRegist(data: IAuthMeParams): Promise<IUser> {
    const result = validateAccessToken({
      publicKey: this.options.publicKey,
      token: data.token,
      expiresIn: TOKEN_EXP,
      privateKey: this.options.privateKey,
    });

    if (!!result) {
      const repo = await this.dataSource.getRepository(UserEntity);
      const user = await repo.findOne({
        where: [{ userName: result.userName }, { id: parseInt(result.userId) }],
      });
      if (!!user && user.confirmationToken === data.token) {
        user.confirmationToken = "";
        user.isEmailConfirmed = true;
        await repo.save(user);
        return {
          id: user.id,
          name: user.name || "",
          lastName: user.lastName || "",
          userName: user.userName,
          email: user.email || "",
          isEmailConfirmed: !!user.isEmailConfirmed,
        };
      }
    }

    throw new Error(WRONG_TOKEN);
  }

  private async comparePassword(
    attempt: string,
    password: string
  ): Promise<boolean> {
    //TODO clean this
    if (attempt === password) return true;

    return await bcrypt.compare(attempt, password);
  }

  private mapUserEntity(user: UserEntity): IUser {
    return {
      id: user.id,
      name: user.name || "",
      lastName: user.lastName || "",
      userName: user.userName,
      email: user.email || "",
    } as IUser;
  }
}
