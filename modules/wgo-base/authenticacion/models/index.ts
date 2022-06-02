import { IUser } from "../../core/models/user";

export const WRONG_USER_PASSWORD = "User or password invalid";
export const WRONG_TOKEN = "Invalid credentials";
export const USER_AUTH_TOKEN = "AUTH_TOKEN";

export interface IAuthLoginParams {
  user: string;
  password: string;
}

export interface IAuthMeParams {
  token: string;
}

export interface ISuccesLogin {
  token: string;
  user: IUser;
}
