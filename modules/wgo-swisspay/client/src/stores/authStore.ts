import { defineStore } from "pinia";
import {
  ISuccesLogin,
  USER_AUTH_TOKEN,
} from "../../../../wgo-base/authenticacion/models";
import { IUser } from "../../../../wgo-base/core/models/user";

export const userAuthId = "authStore";

export const useAuthStore = defineStore({
  id: userAuthId,
  state: () => ({
    user: <IUser>{},
    token: "",
  }),
  getters: {
    getUser: (state) => {
      return state.user.id ? state.user : null;
    },
    getToken: (state) => {
      return state.token;
    },
  },
  actions: {
    setLogin(login: ISuccesLogin) {
      this.setToken(login.token);
      this.setUser(login.user);
    },
    setToken(token: string) {
      localStorage.setItem(USER_AUTH_TOKEN, token);
      this.token = token;
    },
    setUser(user: IUser) {
      this.user = user;
    },
    resetState() {
      localStorage.clear();
      this.$reset();
    },
  },
});
