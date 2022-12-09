import { IUser } from "../wgo-base/models/core";

export interface IUserContext extends IUser {
  isSuperAdmin?: boolean;
}
export interface IContext {
  user: IUserContext;
}
