import { DataSource } from "typeorm";
import { IUser } from "../../core/models/user";
import { EmailOptions } from "@wisegar-org/wgo-mailer";

export const WRONG_USER_PASSWORD = "User or password invalid";
export const WRONG_TOKEN = "Invalid credentials";
export const WRONG_EMAIL = "Email already exists";
export const WRONG_REGISTER = "Fail user register";
export const WRONG_USER_DONT_EXIST = "User don't exist";
export const USER_AUTH_TOKEN = "AUTH_TOKEN";
export const TOKEN_EXP = "4h";
export const TOKEN_REGISTER_EXP = "24h";

export interface IAuthModelArg {
  dataSource: DataSource;
  privateKey: string;
  publicKey: string;
  // TOKEN_EXPIRES_IN
  hostBase: string;
  tokenExpiresIn?: string;
  tokenRegisterExpiresIn?: string;
  emailOptions: EmailOptions;
}

export interface IAuthLoginParams {
  user: string;
  password: string;
}

export interface IAuthMeParams {
  token: string;
}

export interface IAuthResendParam {
  email: string;
}

export interface IAuthRegisterParams extends IUser {
  password: string;
  isEmailConfirmed: boolean;
}

export interface ISuccesLogin {
  token: string;
  user: IUser;
}
