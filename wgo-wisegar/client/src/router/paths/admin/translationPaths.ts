import { RouteRecordRaw } from "vue-router";
import { AdminTranslationPaths } from "@wisegar-org/wgo-base-models/build/translation";

export const TranslationPathRouter: RouteRecordRaw = {
  path: AdminTranslationPaths.adminTranslation.path,
  name: AdminTranslationPaths.adminTranslation.name,
  component: () => import("layouts/AdminMainLayout.vue"),
  children: [
    {
      path: AdminTranslationPaths.adminTranslation.path,
      component: () => import("pages/Admin/Translation/TranslationPage.vue"),
      meta: {
        auth: AdminTranslationPaths.adminTranslation.auth,
        role: AdminTranslationPaths.adminTranslation.role,
      },
    },
  ],
};
