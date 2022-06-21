import { IUser } from '../../../wgo-base/core/models';

export interface IIdInput {
  id: number;
}

export interface IContext {
  user: IUser;
}
