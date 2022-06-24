import { defineStore } from 'pinia';
import { ISuccesLogin, USER_AUTH_TOKEN } from '../../../../wgo-base/authentication/models';
import { IUser } from '../../../../wgo-base/core/models/user';

export const userAuthId = 'authStore';

export const useAuthStore = defineStore({
  id: userAuthId,
  state: () => ({
    user: <IUser>{},
    token: '',
    reset: true,
  }),
  getters: {
    getUser: (state) => {
      return state.user.id ? state.user : null;
    },
    getToken: (state) => {
      return state.token;
    },
    getOpenLogin: (state) => {
      return !state.token && state.user && !state.reset;
    },
  },
  actions: {
    setLogin(login: ISuccesLogin) {
      localStorage.setItem(USER_AUTH_TOKEN, login.token);
      this.$state = {
        reset: false,
        token: login.token,
        user: login.user,
      };
    },
    setToken(token: string) {
      localStorage.setItem(USER_AUTH_TOKEN, token);
      this.token = token;
    },
    setUser(user: IUser) {
      this.$state = { token: this.token, reset: false, user: user };
    },
    resetState() {
      localStorage.clear();
      this.$reset();
    },
    setReset(reset: boolean) {
      this.reset = reset;
    },
    getAppToken: () => {
      return localStorage.getItem(USER_AUTH_TOKEN) || '';
    },
    isUserInRole(roles: string[]) {
      if (this.user && this.user.roles) {
        const result = roles.map((role) => this.user.roles.indexOf(role) !== -1).reduce((a, b) => a || b, false);
        return result;
      }
      return false;
    },
  },
});
