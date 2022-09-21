import { RouteRecordRaw } from "vue-router";
import { AdminTranslationPaths } from "../../../wgo-base/translation/router";

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
