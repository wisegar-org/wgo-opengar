import { SUPERADMIN } from "src/wgo-base/models/authentication";
import { AdminBasePath, IRouteObject } from "src/wgo-base/models/core";
import { RouteRecordRaw } from "vue-router";

export const AGVInscriptionsAdminPaths: IRouteObject = {
  inscriptions: {
    path: `${AdminBasePath}/inscriptions`,
    name: "agv_admin_inscriptions",
    label: "WGO_INSCRIPTION_ADMIN",
  },
};

export const AGVInscriptionsPathRouter: RouteRecordRaw = {
  path: AGVInscriptionsAdminPaths.inscriptions.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVInscriptionsAdminPaths.inscriptions.path,
      component: () => import("pages/AdminAgv/AdminInscriptionsPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN],
      },
    },
  ],
};
