import { DataSource } from "typeorm";
import {
  IAuthEditParams,
  IAuthLoginParams,
  IAuthMeParams,
  IAuthModelArg,
  IAuthRegisterParams,
  IAuthResendParam,
  IChangePasswordParam,
  ICheckUserUniqueUserName,
  ISuccesLogin,
  TOKEN_EXP,
  TOKEN_REGISTER_EXP,
  WRONG_CONFIRM_EMAIL,
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
import { UserUtils } from "./UserUtils";
import { UserRolesModel } from "./UserRolesModel";
import { WRONG_USER_NAME } from "./constants";

export class AuthModel {
  private dataSource: DataSource;
  private emailService: EmailServer;
  private options: IAuthModelArg;
  private userRolesModel: UserRolesModel;
  /**
   *
   */
  constructor(options: IAuthModelArg) {
    this.dataSource = options.ctx.dataSource;
    this.options = {
      ...options,
      tokenExpiresIn: options.tokenExpiresIn || TOKEN_EXP,
      tokenRegisterExpiresIn:
        options.tokenRegisterExpiresIn || TOKEN_REGISTER_EXP,
    };
    this.emailService = new EmailServer();
    this.userRolesModel = new UserRolesModel(options);
  }

  public async login(data: IAuthLoginParams): Promise<ISuccesLogin> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ userName: data.user }, { email: data.user }],
      relations: ["roles"],
    });

    if (!IsNullOrUndefined(user)) {
      if (user && !user.isEmailConfirmed) {
        throw new Error(WRONG_CONFIRM_EMAIL);
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
          user: UserUtils.mapUserEntity(user),
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
        relations: ["roles"],
      });
      if (!!user) {
        return UserUtils.mapUserEntity(user);
      }
    }

    throw new Error(WRONG_TOKEN);
  }

  public async register(data: IAuthRegisterParams): Promise<IUser> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const listUsers = await repo.find({
      where: [{ userName: data.userName }, { email: data.email }],
      relations: ["roles"],
    });
    if (listUsers.length > 0) {
      throw new Error(
        listUsers[0].userName === data.userName ? WRONG_USER_NAME : WRONG_EMAIL
      );
    }

    let user = new UserEntity();
    user.name = data.name;
    user.lastName = data.lastName;
    user.userName = data.userName;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 10);
    user.isEmailConfirmed = data.isEmailConfirmed;
    user.roles = await this.userRolesModel.getRolesByString(data.roles || []);

    user = await repo.save(user);
    if (user) {
      if (!user.isEmailConfirmed) {
        await this.resendConfirmation(data);
      }
      return UserUtils.mapUserEntity(user);
    }
    throw new Error(WRONG_REGISTER);
  }

  public async editUser(data: IAuthEditParams): Promise<IUser> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ id: data.id }],
      relations: ["roles"],
    });
    if (user) {
      const userNameUser = await repo.findOne({
        where: { userName: data.userName },
      });
      if (!!userNameUser && userNameUser.id !== data.id) {
        throw new Error(WRONG_USER_NAME);
      }
      user.name = data.name;
      user.userName = data.userName;
      user.lastName = data.lastName;
      user.code = data.code;
      user.roles = await this.userRolesModel.getRolesByString(data.roles || []);
      let result = user;
      user.email = data.email;
      if (data.password) user.password = bcrypt.hashSync(data.password, 10);
      if (user.isEmailConfirmed !== data.isEmailConfirmed) {
        if (data.isEmailConfirmed === true) {
          user.isEmailConfirmed = true;
          user.confirmationToken = "";
          result = await repo.save(user);
        } else if (user.email) {
          await repo.save(user);
          return await this.resendConfirmation({
            email: user.email,
          });
        }
      } else {
        result = await repo.save(user);
      }

      return UserUtils.mapUserEntity(result);
    }
    throw new Error(WRONG_USER_DONT_EXIST);
  }

  public async resendConfirmation(data: IAuthResendParam): Promise<IUser> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ email: data.email }],
      relations: ["roles"],
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
      await this.emailService.sendByConfig(
        {
          ...this.options.emailOptions,
          subject: "Wisegar Email Confirmation",
          to: `${data.email}`,
          html: `<div>
          Confirm email <a href="${this.options.hostBase}/#${AuthPaths.authConfirmEmail.path}?token=${user.confirmationToken}"> here </a>
          </div>`,
        },
        {}
      );
      return UserUtils.mapUserEntity(user);
    }

    throw new Error(WRONG_USER_DONT_EXIST);
  }

  public async resetPassword(data: IAuthResendParam): Promise<boolean> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ userName: data.email }, { email: data.email }],
      relations: ["roles"],
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
      await this.emailService.sendByConfig(
        {
          ...this.options.emailOptions,
          subject: "Wisegar Email Reset Password",
          to: `${data.email}`,
          html: `<div>
          To reset the password click <a href="${this.options.hostBase}/#${AuthPaths.authChangePassword.path}?token=${token}"> here </a>
          </div>`,
        },
        this.options.transportEmailOptions
      );
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
        relations: ["roles"],
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
        relations: ["roles"],
      });
      if (!!user && user.confirmationToken === data.token) {
        user.confirmationToken = "";
        user.isEmailConfirmed = true;
        await repo.save(user);
        return UserUtils.mapUserEntity(user);
      }
    }

    throw new Error(WRONG_TOKEN);
  }

  async checkUserUniqueUserName(data: ICheckUserUniqueUserName) {
    const repo = await this.dataSource.getRepository(UserEntity);
    const userExists = await repo.findOne({
      where: {
        id: data.id,
      },
    });

    const userNameExist = await repo.findOne({
      where: {
        userName: data.userName,
      },
    });

    return (
      (!userExists && !userNameExist) ||
      (!!userExists && !userNameExist) ||
      (!!userExists && !!userNameExist && userExists.id === userNameExist.id)
    );
  }

  private async comparePassword(
    attempt: string,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(attempt, password);
  }
}
