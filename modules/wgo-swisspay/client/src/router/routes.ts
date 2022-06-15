import { IRouteObject } from "../../../../wgo-base/core/models";
import { RouteRecordRaw } from "vue-router";
import { AuthPaths } from "../../../../wgo-base/authenticacion/router";

export const Paths: IRouteObject = {
  home: {
    path: "/",
    label: "Home",
    name: "home",
  },
};

const routes: RouteRecordRaw[] = [
  {
    path: Paths.home.path,
    name: Paths.home.name,
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
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
        component: () =>
          import("src/pages/Auth/RegisterChangePasswordPage.vue"),
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
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
