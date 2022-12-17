import { RouteRecordRaw } from "vue-router";
import { AdminLanguagePaths } from "@wisegar-org/wgo-base-models";

export const LanguagePathRouter: RouteRecordRaw = {
  path: AdminLanguagePaths.adminLanguage.path,
  name: AdminLanguagePaths.adminLanguage.name,
  component: () => import("layouts/AdminMainLayout.vue"),
  children: [
    {
      path: AdminLanguagePaths.adminLanguage.path,
      component: () => import("pages/Admin/Language/LanguagePage.vue"),
      meta: {
        auth: AdminLanguagePaths.adminLanguage.auth,
        role: AdminLanguagePaths.adminLanguage.role,
      },
    },
  ],
};
