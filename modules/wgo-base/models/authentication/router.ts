import { translations } from "./translations";
import { AdminBasePath, IRouteObject } from "../core/router";
import { SUPERADMIN } from "./constants";

const AuthPathsBase = "/auth";

export const AuthPaths: IRouteObject = {
  authUsers: {
    path: `${AdminBasePath}/users`,
    name: "auth_users",
    label: translations.USER_TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
  authLogin: {
    path: `${AuthPathsBase}/login`,
    name: "auth_login",
    label: translations.LOGIN_TITLE,
    auth: false,
  },
  authLoginParam: {
    path: `${AuthPathsBase}/login/:path`,
    name: "auth_login_path",
    label: translations.LOGIN_TITLE,
    auth: false,
  },
  authRegister: {
    path: `${AuthPathsBase}/register`,
    name: "auth_register",
    label: translations.REGISTER_TITLE,
    auth: false,
  },
  authEmailSended: {
    path: `${AuthPathsBase}/emailSended`,
    name: "auth_email_sended",
    label: translations.EMAIL_SENDED_TITLE,
    auth: false,
  },
  authConfirmEmail: {
    path: `${AuthPathsBase}/confirmEmail`,
    name: "auth_confim_email",
    label: translations.CONFIRM_EMAIL_TITLE,
    auth: false,
  },
  authResendConfirmation: {
    path: `${AuthPathsBase}/resendConfirm`,
    name: "auth_resend_confimation",
    label: translations.RESEND_EMAIL_TITLE,
    auth: false,
  },
  authResetPassword: {
    path: `${AuthPathsBase}/resetPassword`,
    name: "auth_reset_password",
    label: translations.RESET_PASSWORD_TITLE,
    auth: false,
  },
  authChangePassword: {
    path: `${AuthPathsBase}/changePassword`,
    name: "auth_change_password",
    label: translations.CHANGE_PASSWORD_TITLE,
    auth: false,
  },
};
