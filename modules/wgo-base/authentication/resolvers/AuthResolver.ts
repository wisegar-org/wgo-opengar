import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import {
  EditUserInput,
  LoginInput,
  MeInput,
  RegisterInput,
  ResendConfirmationInput,
  ResetPasswordInput,
} from "./AuthInputs";
import { LoginResponse, UserResponse } from "./AuthResponses";
import {
  AUTH_PATH_CHANGE_RESET_PASSWORD,
  AUTH_PATH_CONFIRM_REGIST,
  AUTH_PATH_DELETE_USER,
  AUTH_PATH_EDIT_USER,
  AUTH_PATH_GET_ALL_ROLES,
  AUTH_PATH_GET_ALL_USERS,
  AUTH_PATH_GET_USER,
  AUTH_PATH_LOGIN,
  AUTH_PATH_ME,
  AUTH_PATH_REGISTER,
  AUTH_PATH_RESEND_CONFIRMATION,
  AUTH_PATH_RESET_PASSWORD,
} from "../router/server";
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from "@wisegar-org/wgo-settings";
import { SettingsModel } from "../../settings/models/SettingsModel";
import { SETTINGS_SMTP } from "../../settings/models/constants";
import { SmtpSettings } from "../../settings/models";
import { IAuthModelArg } from "../models";
import { AuthModel } from "../models/AuthModel";
import { IContextBase } from "../../core/models/context";
import { UserRolesModel } from "../models/UserRolesModel";
import { IdInput } from "../../core/resolvers/CoreInputs";

@Resolver()
export class AuthResolver {
  private options: any;

  /**
   *
   */
  constructor() {
    this.options = {
      privateKey: GetPrivateKey(),
      publicKey: GetPublicKey(),
      hostBase: GetHostBaseKey(),
      tokenExpiresIn: GetExpiresInKey(),
      tokenRegisterExpiresIn: "24h",
      emailOptions: { from: GetEmailAppAddressKey() } as any,
      transportEmailOptions: {},
    };
  }

  @Mutation(() => LoginResponse, { name: AUTH_PATH_LOGIN })
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: IContextBase) {
    const authModel = new AuthModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const login = await authModel.login(data);
    return login as LoginResponse;
  }

  @Query(() => UserResponse, { name: AUTH_PATH_ME })
  async me(@Arg("data") data: MeInput, @Ctx() ctx: IContextBase) {
    const authModel = new AuthModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const user = await authModel.me(data);
    return user as UserResponse;
  }

  @Mutation(() => UserResponse, { name: AUTH_PATH_REGISTER })
  async register(@Arg("data") data: RegisterInput, @Ctx() ctx: IContextBase) {
    const settingsModel = new SettingsModel(ctx.dataSource);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: config.SMTP_EMAIL_PASSWORD,
      },
    };
    const authModel = new AuthModel({ ...this.options, transportEmailOptions });
    const user = await authModel.register(data as any);
    return user;
  }

  @Mutation(() => UserResponse, { name: AUTH_PATH_EDIT_USER })
  async editUser(@Arg("data") data: EditUserInput, @Ctx() ctx: IContextBase) {
    const settingsModel = new SettingsModel(ctx.dataSource);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: config.SMTP_EMAIL_PASSWORD,
      },
    };
    const authModel = new AuthModel({
      ...this.options,
      dataSource: ctx.dataSource,
      transportEmailOptions,
    });
    const user = await authModel.editUser(data as any);
    return user;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_RESEND_CONFIRMATION })
  async resendConfirmation(
    @Arg("data") data: ResendConfirmationInput,
    @Ctx() ctx: IContextBase
  ) {
    const settingsModel = new SettingsModel(ctx.dataSource);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: config.SMTP_EMAIL_PASSWORD,
      },
    };
    const authModel = new AuthModel({
      ...this.options,
      dataSource: ctx.dataSource,
      transportEmailOptions,
    });
    const user = await authModel.resendConfirmation(data);
    return !!user;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_RESET_PASSWORD })
  async resetPassword(
    @Arg("data") data: ResendConfirmationInput,
    @Ctx() ctx: IContextBase
  ) {
    const settingsModel = new SettingsModel(ctx.dataSource);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: config.SMTP_EMAIL_PASSWORD,
      },
    };
    const authModel = new AuthModel({
      ...this.options,
      dataSource: ctx.dataSource,
      transportEmailOptions,
    });
    const resetResult = await authModel.resetPassword(data);
    return !!resetResult;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_CHANGE_RESET_PASSWORD })
  async changeResetPassword(
    @Arg("data") data: ResetPasswordInput,
    @Ctx() ctx: IContextBase
  ) {
    const authModel = new AuthModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const resetResult = await authModel.changePassword(data);
    return resetResult;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_CONFIRM_REGIST })
  async confirmRegist(@Arg("data") data: MeInput, @Ctx() ctx: IContextBase) {
    const authModel = new AuthModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const user = await authModel.confirmRegist(data);
    return !!user;
  }

  @Query(() => UserResponse, { name: AUTH_PATH_GET_USER })
  async getUser(@Arg("data") data: IdInput, @Ctx() ctx: IContextBase) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const user = await userRolesModel.getUser(data.id);
    return user;
  }

  @Query(() => [UserResponse], { name: AUTH_PATH_GET_ALL_USERS })
  async getAllUsers(@Ctx() ctx: IContextBase) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const users = await userRolesModel.getAllUsers();
    return users;
  }

  @Query(() => [String], { name: AUTH_PATH_GET_ALL_ROLES })
  async getAllRoles(@Ctx() ctx: IContextBase) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const roles = await userRolesModel.getAllRoles();
    return roles;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_DELETE_USER })
  async deleteUser(@Arg("data") data: IdInput, @Ctx() ctx: IContextBase) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      dataSource: ctx.dataSource,
    });
    const user = await userRolesModel.deleteUser(data);
    return !!user;
  }
}
