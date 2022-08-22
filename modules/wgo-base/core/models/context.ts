import { DataSource } from 'typeorm';
import { IUser } from './user';
import { EventEmitter } from 'events';

export interface IUserContext extends IUser {
  isSuperAdmin?: boolean;
}
export interface IContextBase {
  user?: IUserContext;
  dataSource: DataSource;
  web_root: string;
  language: number;
  emiter: EventEmitter;
}
