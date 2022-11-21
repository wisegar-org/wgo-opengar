import { SUPERADMIN } from "src/wgo-base/authentication/models";
import { IRouteObject } from "src/wgo-base/core/models";
import { AdminBasePath } from "src/wgo-base/core/router";
import { RouteRecordRaw } from "vue-router";

export const AGVEventsAdminPaths: IRouteObject = {
  events: {
    path: `${AdminBasePath}/events`,
    name: "agv_admin_events",
    label: "WGO_EVENTS_ADMIN",
  },
};

export const AGVEventsPathRouter: RouteRecordRaw = {
  path: AGVEventsAdminPaths.events.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVEventsAdminPaths.events.path,
      component: () => import("pages/AdminAgv/AdminEventsPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN],
      },
    },
  ],
};
