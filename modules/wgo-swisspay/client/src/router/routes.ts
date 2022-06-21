import { IRouteObject } from "../../../../wgo-base/core/models";
import { RouteRecordRaw } from "vue-router";
import { Paths } from "./paths";
import { AuthPathRouter } from "./paths/authPaths";
import { EmailMediaPathRouter } from "./paths/emailMediaPaths";

const routes: RouteRecordRaw[] = [
  {
    path: Paths.home.path,
    name: Paths.home.name,
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  AuthPathRouter,
  EmailMediaPathRouter,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
