import { IUser } from "../../../models/core";
import { UserEntity } from "../../../server/authentication/database/entities/UserEntity";

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
