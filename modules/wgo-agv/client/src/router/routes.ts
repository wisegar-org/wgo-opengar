import { RouteRecordRaw } from "vue-router";
import { AuthAdminPathRouter } from "./paths/admin/authPaths";
import { ContactPathRouter } from "./paths/admin/contactPaths";
import { LanguagePathRouter } from "./paths/admin/languagePaths";
import { SettingsPathRouter } from "./paths/admin/settingsPaths";
import { TranslationPathRouter } from "./paths/admin/translationPaths";
import { AuthPathRouter } from "./paths/authPaths";
import { DetailsPathRouter } from "./paths/detailsPath";
import { PollPathRouter } from "./paths/pollPaths";
import { SitePathRouter } from "./paths/sitePaths";

const routes: RouteRecordRaw[] = [
  SitePathRouter,
  DetailsPathRouter,
  PollPathRouter,
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
