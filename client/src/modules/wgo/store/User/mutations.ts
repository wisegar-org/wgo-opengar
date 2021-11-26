import { UserGql } from 'src/graphql';
import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';
import { RolEntityEnum } from '@wisegar-org/wgo-opengar-core-ui';
import { RolModel, UserLogged, UsersModel } from '../../models/models';

export const userMutations = {
  setLoggedUser: 'setLoggedUser',
  setUsers: 'setUsers',
  setRoles: 'setRoles'
};

export const mutations: MutationTree<UserStateInterface> = {
  setLoggedUser(state, loggedUser: UserGql) {
    if (loggedUser) {
      const user = loggedUser as UserLogged;

      user.isSuperAdmin =
        (loggedUser.roles || []).filter(
          rol => rol.name === RolEntityEnum.superAdmin
        ).length > 0;
      user.isCustomer =
        (loggedUser.roles || []).filter(
          rol => rol.name === RolEntityEnum.customer
        ).length > 0;
      state.loggedUser = user;
    } else {
      state.loggedUser = <UserLogged>{};
    }
  },
  setUsers(state, users: UsersModel[]) {
    state.usersList = users;
  },
  setRoles(state, roles: RolModel[]) {
    state.roles = roles;
  }
};
