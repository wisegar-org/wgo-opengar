import { RouteRecordRaw } from "vue-router";
import { Paths } from "../paths";
import { AuthPaths } from "../../../../../wgo-base/authenticacion/router";

export const AuthPathRouter: RouteRecordRaw = {
  path: Paths.home.path,
  component: () => import("layouts/EmptyLayout.vue"),
  children: [
    {
      path: AuthPaths.authLogin.path,
      name: AuthPaths.authLogin.name,
      component: () => import("src/pages/Auth/LoginPage.vue"),
    },
    {
      path: AuthPaths.authRegister.path,
      name: AuthPaths.authRegister.name,
      component: () => import("src/pages/Auth/RegisterPage.vue"),
    },
    {
      path: AuthPaths.authEmailSended.path,
      name: AuthPaths.authEmailSended.name,
      component: () => import("src/pages/Auth/RegisterEmailSendedPage.vue"),
      props: (route) => {
        return {
          email: route.params.email,
        };
      },
    },
    {
      path: AuthPaths.authConfirmEmail.path,
      name: AuthPaths.authConfirmEmail.name,
      component: () => import("src/pages/Auth/RegisterConfirmEmailPage.vue"),
      props: (route) => {
        return {
          token: route.params.token,
        };
      },
    },
    {
      path: AuthPaths.authChangePassword.path,
      name: AuthPaths.authChangePassword.name,
      component: () => import("src/pages/Auth/RegisterChangePasswordPage.vue"),
      props: (route) => {
        return {
          token: route.params.token,
        };
      },
    },
    {
      path: AuthPaths.authResendConfirmation.path,
      name: AuthPaths.authResendConfirmation.name,
      component: () => import("src/pages/Auth/RegisterResendConfirmPage.vue"),
    },
    {
      path: AuthPaths.authResetPassword.path,
      name: AuthPaths.authResetPassword.name,
      component: () => import("src/pages/Auth/RegisterResetPasswordPage.vue"),
    },
  ],
};
