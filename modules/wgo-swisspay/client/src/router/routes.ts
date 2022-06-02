import { RouteRecordRaw } from "vue-router";

export const Paths = {
  home: {
    path: "/",
    name: "home",
    label: "Home",
  },
  authLogin: {
    path: "/login",
    name: "auth_login",
    label: "Login",
  },
  authRegister: {
    path: "/register",
    name: "auth_reister",
    label: "Register",
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
        path: Paths.authLogin.path,
        name: Paths.authLogin.name,
        component: () => import("src/pages/Auth/LoginPage.vue"),
      },
      {
        path: Paths.authRegister.path,
        name: Paths.authRegister.name,
        component: () => import("src/pages/Auth/RegisterPage.vue"),
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
