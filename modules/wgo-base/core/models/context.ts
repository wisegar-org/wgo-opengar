import { DataSource } from "typeorm";
import { IUser } from "./user";

export interface IContextBase {
  user?: IUser;
  dataSource: DataSource;
}
