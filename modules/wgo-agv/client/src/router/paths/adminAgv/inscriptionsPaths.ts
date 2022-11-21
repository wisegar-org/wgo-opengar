import { SUPERADMIN } from "src/wgo-base/authentication/models";
import { IRouteObject } from "src/wgo-base/core/models";
import { AdminBasePath } from "src/wgo-base/core/router";
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
