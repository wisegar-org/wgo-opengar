import { ISuccesLogin } from ".";
import { IUser } from "../../core/models";
import { AuthService } from "../services/AuthService";
import { USER_AUTH_TOKEN } from "./constants";

export class AuthStore {
  token: string;
  user: IUser;
  /**
   *
   */
  constructor() {
    this.token = localStorage.getItem(USER_AUTH_TOKEN) || "";
    this.user = <IUser>{};
  }

  async me() {
    const authService = new AuthService();
    if (this.token) {
      const user = await authService.me({ token: this.token || "" });
      if (!!user) {
        this.user = user;
        return true;
      } else {
        this.resetState();
      }
    }
    return false;
  }

  setLogin(login: ISuccesLogin) {
    this.user = login.user;
    this.token = login.token;
    localStorage.setItem(USER_AUTH_TOKEN, login.token);
  }

  setToken(token: string) {
    localStorage.setItem(USER_AUTH_TOKEN, token);
    this.token = token;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  getAppToken() {
    return localStorage.getItem(USER_AUTH_TOKEN) || "";
  }

  isUserInRole(roles: string[]) {
    if (this.user && this.user.roles) {
      const result = roles
        .map((role) => this.user.roles.indexOf(role) !== -1)
        .reduce((a, b) => a || b, false);
      return result;
    }
    return false;
  }

  resetState() {
    localStorage.clear();
    this.token = "";
    this.user = <IUser>{};
  }

  setReset(reset: boolean) {
    this.resetState();
  }
}
