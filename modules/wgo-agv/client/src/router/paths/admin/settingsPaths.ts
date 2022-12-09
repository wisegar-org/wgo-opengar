import { AdminSettingsPaths } from "src/wgo-base/models/settings/router";
import { RouteRecordRaw } from "vue-router";

export const SettingsPathRouter: RouteRecordRaw = {
  path: AdminSettingsPaths.adminSettings.path,
  name: AdminSettingsPaths.adminSettings.name,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AdminSettingsPaths.adminSettings.path,
      component: () => import("pages/Admin/Settings/SettingsPage.vue"),
      meta: {
        auth: AdminSettingsPaths.adminSettings.auth,
        role: AdminSettingsPaths.adminSettings.role,
      },
    },
  ],
};
