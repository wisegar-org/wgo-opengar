import { AdminTranslationPaths } from "src/wgo-base/models/translation/router";
import { RouteRecordRaw } from "vue-router";

export const TranslationPathRouter: RouteRecordRaw = {
  path: AdminTranslationPaths.adminTranslation.path,
  name: AdminTranslationPaths.adminTranslation.name,
  component: () => import("layouts/MainLayout.vue"),
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
