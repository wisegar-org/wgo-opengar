import { RolModel, UserLogged, UsersModel } from '../../models/models';

export interface UserStateInterface {
  loggedUser: UserLogged;
  usersList: UsersModel[];
  roles: RolModel[];
}

const state = (): UserStateInterface => {
  return {
    loggedUser: <UserLogged>{},
    usersList: [],
    roles: []
  };
};

export default state;
