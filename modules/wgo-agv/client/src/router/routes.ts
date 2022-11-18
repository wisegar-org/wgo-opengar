import { RouteRecordRaw } from "vue-router";
import { AuthAdminPathRouter } from "./paths/admin/authPaths";
import { ContactPathRouter } from "./paths/admin/contactPaths";
import { LanguagePathRouter } from "./paths/admin/languagePaths";
import { SettingsPathRouter } from "./paths/admin/settingsPaths";
import { TranslationPathRouter } from "./paths/admin/translationPaths";
import { AuthPathRouter } from "./paths/authPaths";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/SiteMainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  AuthPathRouter,
  AuthAdminPathRouter,
  LanguagePathRouter,
  ContactPathRouter,
  TranslationPathRouter,
  SettingsPathRouter,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
