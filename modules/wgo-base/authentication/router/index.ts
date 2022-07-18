import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";
import { translations } from "../models/translations";

const AuthPathsBase = "/auth";

export const AuthPaths: IRouteObject = {
  authUsers: {
    path: `${AdminBasePath}/users`,
    name: "auth_users",
    label: translations.USER_TITLE,
  },
  authLogin: {
    path: `${AuthPathsBase}/login`,
    name: "auth_login",
    label: translations.LOGIN_TITLE,
  },
  authLoginParam: {
    path: `${AuthPathsBase}/login/:path`,
    name: "auth_login_path",
    label: translations.LOGIN_TITLE,
  },
  authRegister: {
    path: `${AuthPathsBase}/register`,
    name: "auth_register",
    label: translations.REGISTER_TITLE,
  },
  authEmailSended: {
    path: `${AuthPathsBase}/emailSended`,
    name: "auth_email_sended",
    label: translations.EMAIL_SENDED_TITLE,
  },
  authConfirmEmail: {
    path: `${AuthPathsBase}/confirmEmail`,
    name: "auth_confim_email",
    label: translations.CONFIRM_EMAIL_TITLE,
  },
  authResendConfirmation: {
    path: `${AuthPathsBase}/resendConfirm`,
    name: "auth_resend_confimation",
    label: translations.RESEND_EMAIL_TITLE,
  },
  authResetPassword: {
    path: `${AuthPathsBase}/resetPassword`,
    name: "auth_reset_password",
    label: translations.RESET_PASSWORD_TITLE,
  },
  authChangePassword: {
    path: `${AuthPathsBase}/changePassword`,
    name: "auth_change_password",
    label: translations.CHANGE_PASSWORD_TITLE,
  },
};
