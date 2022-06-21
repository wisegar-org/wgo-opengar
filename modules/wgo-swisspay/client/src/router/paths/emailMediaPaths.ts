import { RouteRecordRaw } from "vue-router";
import { Paths } from "../paths";
import { IRouteObject } from "../../../../../wgo-base/core/models";

export const EmailMediaPaths: IRouteObject = {
  emailMedia: {
    path: "/emailMedia",
    label: "Email Media",
    name: "email_media",
  },
};

export const EmailMediaPathRouter: RouteRecordRaw = {
  path: EmailMediaPaths.emailMedia.path,
  name: EmailMediaPaths.emailMedia.name,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: EmailMediaPaths.emailMedia.path,
      component: () => import("pages/EmailMedia/EmailMediaPage.vue"),
    },
  ],
};
