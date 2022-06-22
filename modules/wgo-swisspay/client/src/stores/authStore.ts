import { defineStore } from 'pinia';
import { ISuccesLogin, USER_AUTH_TOKEN } from '../../../../wgo-base/authenticacion/models';
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
    getAppToken: (state) => {
      return localStorage.getItem(USER_AUTH_TOKEN) || state.token || '';
    },
    getOpenLogin: (state) => {
      return !state.token && state.user && !state.reset;
    },
  },
  actions: {
    setLogin(login: ISuccesLogin) {
      this.setReset(false);
      this.setToken(login.token);
      this.setUser(login.user);
    },
    setToken(token: string) {
      localStorage.setItem(USER_AUTH_TOKEN, token);
      this.$state = { ...this.$state, token: token, reset: false };
    },
    setUser(user: IUser) {
      this.reset = false;
      this.user = user;
    },
    resetState() {
      localStorage.clear();
      this.$reset();
    },
    setReset(reset: boolean) {
      this.reset = reset;
    },
  },
});
