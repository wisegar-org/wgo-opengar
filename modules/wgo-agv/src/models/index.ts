import { IUser } from "@wisegar-org/wgo-base-models/build/core";

export interface IUserContext extends IUser {
  isSuperAdmin?: boolean;
}
export interface IContext {
  user: IUserContext;
}
