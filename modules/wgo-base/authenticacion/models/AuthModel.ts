import { DataSource } from "typeorm";
import {
  IAuthLoginParams,
  ISuccesLogin,
  WRONG_TOKEN,
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

export class AuthModel {
  private dataSource: DataSource;
  private privateKey: string;
  private publicKey: string;
  /**
   *
   */
  constructor(dataSource: DataSource, privateKey: string, publicKey: string) {
    this.dataSource = dataSource;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  public async login(data: IAuthLoginParams): Promise<ISuccesLogin> {
    const repo = await this.dataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: [{ userName: data.user }, { email: data.user }],
    });

    if (!IsNullOrUndefined(user)) {
      if (user && (await this.comparePassword(data.password, user.password))) {
        const token = generateAccessToken({
          privateKey: this.privateKey,
          expiresIn: "4h",
          payload: {
            userId: user.id.toString(),
            userName: user.userName,
            sessionId: -1,
          },
        });
        return {
          token,
          user: {
            id: user.id,
            name: user.name || "",
            lastName: user.lastName || "",
            userName: user.userName,
            email: user.email || "",
          },
        };
      }
    }

    throw new Error(WRONG_USER_PASSWORD);
  }

  public async me(data: { token: string }): Promise<IUser> {
    const result = validateAccessToken({
      publicKey: this.publicKey,
      token: data.token,
      expiresIn: "4h",
      privateKey: this.privateKey,
    });

    if (!!result) {
      const repo = await this.dataSource.getRepository(UserEntity);
      const user = await repo.findOne({
        where: [{ userName: result.userName }, { id: parseInt(result.userId) }],
      });
      if (!!user) {
        return {
          id: user.id,
          name: user.name || "",
          lastName: user.lastName || "",
          userName: user.userName,
          email: user.email || "",
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
}
