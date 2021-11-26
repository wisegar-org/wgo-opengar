import { ActionTree } from 'vuex';
import { UserStateInterface } from './state';
import {
  LoginModelInputGql,
  UserInputGql,
  UserLoginResponseGql,
  UserResponseGql
} from 'src/graphql';
import { AuthService } from '../../services';
import { ServiceProvider } from '../../services';
import { userMutations } from './mutations';
import { getSettings } from 'src/boot/settings';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import { UsersService } from '../../services/UserService';
import { UsersModel } from '../../models/models';

const ApiSettings = getSettings();

const authService: AuthService = ServiceProvider.GetScoped(AuthService);
const usersService: UsersService = ServiceProvider.GetScoped(UsersService);

export const userActions = {
  loginUser: 'loginUser',
  confirmEmail: 'confirmEmail',
  registerUser: 'registerUser',
  updateUser: 'updateUser',
  updateUserAdmin: 'updateUserAdmin',
  updateUserDefault: 'updateUserDefault',
  resendConfirmation: 'resendConfirmation',
  logoutUser: 'logoutUser',
  setUserLanguage: 'setUserLanguage',
  getVersionServer: 'getVersionServer',
  loadUserLogged: ApiSettings.USER_LOGGED_ACTION,
  allUsers: 'allUsers',
  allRoles: 'allRoles',
  createUser: 'createUser',
  getUser: 'getUser',
  deleteUser: 'deleteUser'
};

const actions: ActionTree<UserStateInterface, any> = {
  async loginUser(
    { commit },
    form: LoginModelInputGql
  ): Promise<UserLoginResponseGql> {
    const result: UserLoginResponseGql = await authService.loginUser(form);
    if (result.isSuccess && result.result) {
      commit(userMutations.setLoggedUser, result.result.user);
      localStorage.setItem(
        LocalStorageSettings.KEY_AUTH_TOKEN,
        result.result.token || ''
      );
      localStorage.setItem(
        LocalStorageSettings.KEY_USER_ID,
        result.result.user.id.toString()
      );
      return result;
    }
    return result;
  },
  async loadUserLogged({ commit }) {
    try {
      const idString = localStorage.getItem(LocalStorageSettings.KEY_USER_ID);
      if (idString) {
        const id = Number.parseInt(idString);
        const result: UserResponseGql = await authService.getUserLoggedById(id);
        if (result.isSuccess) {
          commit(userMutations.setLoggedUser, result.result);
        }
      }
    } catch (error) {
      commit(userMutations.setLoggedUser, null);
    }
  },
  async registerUser({}, form: UserInputGql): Promise<UserResponseGql> {
    const response = await authService.registerUser(form);
    return response;
  },
  async updateUser(
    { commit, dispatch },
    form: UserInputGql
  ): Promise<UserResponseGql> {
    const response = (await dispatch(
      userActions.updateUserDefault,
      form
    )) as UserResponseGql;
    if (response.isSuccess) {
      commit(userMutations.setLoggedUser, response.result);
    }
    return response;
  },
  async updateUserAdmin(
    { dispatch },
    form: UserInputGql
  ): Promise<UserResponseGql> {
    const response = (await dispatch(
      userActions.updateUserDefault,
      form
    )) as UserResponseGql;
    if (response.isSuccess) {
      await dispatch(userActions.allUsers, true);
    }
    return response;
  },
  async updateUserDefault({}, form: UserInputGql): Promise<UserResponseGql> {
    const response = await authService.updateUser(form);
    return response;
  },
  async setUserLanguage({ dispatch }, user: { uuid: string; langId: number }) {
    const response = await usersService.setUserLanguage(user.uuid, user.langId);
    if (response) {
      await dispatch(userActions.loadUserLogged);
    }
  },
  async confirmEmail({}, token: string) {
    const result = await usersService.confirmEmail(token);
    return result;
  },
  async resendConfirmation({}, email: string) {
    const result = await usersService.resendConfirmEmail(email);
    return result;
  },
  logoutUser({ commit }) {
    localStorage.clear();
    commit(userMutations.setLoggedUser, null);
  },
  async getVersionServer({}) {
    const version = await authService.getServerVersion();
    return version;
  },
  async allUsers({ commit, state }, force?: false) {
    if (!!force || state.usersList.length === 0) {
      const usersList = await usersService.getAllUsers();
      commit(userMutations.setUsers, usersList);
      return usersList;
    }
    return state.usersList;
  },

  async allRoles({ commit, state }, force?: false) {
    if (!!force || state.roles.length === 0) {
      const rolesList = await usersService.getAllRoles();
      console.log(rolesList);
      commit(userMutations.setRoles, rolesList);
      return rolesList;
    }
    return state.roles;
  },

  async createUser({ dispatch }, user: UsersModel) {
    const result = await usersService.createUser(user);
    if (result) {
      await dispatch(userActions.allUsers, true);
    }
    return result;
  },

  // async updateUser({ dispatch }, user: UsersModel) {
  //   const result = await usersService.updateUser(user);
  //   if (result) {
  //     await dispatch(usersActionsKeys.allUsers, true);
  //   }
  //   return result;
  // },

  async getUser({ dispatch, state }, userId: number) {
    if (state.usersList.length === 0)
      await dispatch(userActions.allUsers, true);

    return state.usersList.find(item => item.id === userId);
  },

  async deleteUser({ dispatch }, user: UsersModel) {
    const result = await usersService.deleteUser(user);
    console.log(result);
    if (result) {
      await dispatch(userActions.allUsers, true);
    }
    return result;
  }
};

export default actions;
