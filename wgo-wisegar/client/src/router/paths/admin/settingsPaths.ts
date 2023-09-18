import { RouteRecordRaw } from "vue-router";
import { AdminSettingsPaths } from "@wisegar-org/wgo-base-models/build/settings";

export const SettingsPathRouter: RouteRecordRaw = {
  path: AdminSettingsPaths.adminSettings.path,
  name: AdminSettingsPaths.adminSettings.name,
  component: () => import("layouts/AdminMainLayout.vue"),
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