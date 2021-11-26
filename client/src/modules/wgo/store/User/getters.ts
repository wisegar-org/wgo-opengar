import { getSettings } from 'src/boot/settings';
import { GetterTree } from 'vuex';
import { UserStateInterface } from './state';

const ApiSettings = getSettings();

export const userGetters = {
  getLoggedUser: ApiSettings.USER_LOGGED_GETTER,
  isLogged: 'isLogged',
  getUsers: 'getUsers',
  getRoles: 'getRoles'
};

const getters: GetterTree<UserStateInterface, any> = {
  getLoggedUser(state) {
    return state.loggedUser && state.loggedUser.userName
      ? state.loggedUser
      : null;
  },
  isLogged(state) {
    return state.loggedUser && state.loggedUser.id ? true : false;
  },
  getUsers(state) {
    return state.usersList;
  },
  getRoles(state) {
    return state.roles;
  }
};

export default getters;
