import { IUser } from "../../core/models";
import { UserEntity } from "../database/entities/UserEntity";

export const UserUtils = {
  mapUserEntity(user: UserEntity): IUser {
    return {
      id: user.id,
      name: user.name || "",
      lastName: user.lastName || "",
      userName: user.userName,
      email: user.email || "",
      isEmailConfirmed: !!user.isEmailConfirmed,
      code: user.code,
      certificate: user.certificate,
      roles: (user.roles || []).map((role) => role.name),
    } as IUser;
  },
};
