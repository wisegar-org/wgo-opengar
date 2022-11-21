import { SUPERADMIN } from "src/wgo-base/authentication/models";
import { IRouteObject } from "src/wgo-base/core/models";
import { AdminBasePath } from "src/wgo-base/core/router";
import { RouteRecordRaw } from "vue-router";

export const AGVContentAdminPaths: IRouteObject = {
  content: {
    path: `${AdminBasePath}/content`,
    name: "agv_admin_content",
    label: "WGO_SITE_CONTENT_ADMIN",
  },
  contentComitato: {
    path: `${AdminBasePath}/content/comitato`,
    name: "agv_admin_content_comitato",
    label: "WGO_SITE_CONTENT_COMITATO_ADMIN",
  },
  contentSocialMedia: {
    path: `${AdminBasePath}/content/retiSociali`,
    name: "agv_admin_content_retiSociali",
    label: "WGO_SITE_CONTENT_RETISOCIALI_ADMIN",
  },
};

export const AGVContentPathRouter: RouteRecordRaw = {
  path: AGVContentAdminPaths.content.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVContentAdminPaths.content.path,
      redirect: AGVContentAdminPaths.contentComitato.path,
    },
    {
      path: AGVContentAdminPaths.contentComitato.path,
      component: () => import("pages/AdminAgv/AdminComitatoContentPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN],
      },
    },
    {
      path: AGVContentAdminPaths.contentSocialMedia.path,
      component: () => import("pages/AdminAgv/AdminSocialMediaContentPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN],
      },
    },
  ],
};
