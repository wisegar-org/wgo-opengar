import { DataSource } from "typeorm";
import { IUser } from "./user";

export interface IUserContext extends IUser {
  isSuperAdmin?: boolean;
}
export interface IContextBase {
  user?: IUserContext;
  dataSource: DataSource;
  web_root: string;
  language: number;
}
