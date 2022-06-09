import { IRouteObject } from "../../core/models";

const AuthPathsBase = "/auth";

export const AuthPaths: IRouteObject = {
  authLogin: {
    path: `${AuthPathsBase}/login`,
    name: "auth_login",
    label: "Login",
  },
  authRegister: {
    path: `${AuthPathsBase}/register`,
    name: "auth_register",
    label: "Register",
  },
  authEmailSended: {
    path: `${AuthPathsBase}/emailSended`,
    name: "auth_email_sended",
    label: "Email Sended",
  },
  authConfirmEmail: {
    path: `${AuthPathsBase}/confirmEmail`,
    name: "auth_confim_email",
    label: "Confirm Email",
  },
  authResendConfirmation: {
    path: `${AuthPathsBase}/resendConfirm`,
    name: "auth_resend_confimation",
    label: "Resend Confirm Email",
  },
  authResetPassword: {
    path: `${AuthPathsBase}/resetPassword`,
    name: "auth_reset_password",
    label: "Reset Password",
  },
};
