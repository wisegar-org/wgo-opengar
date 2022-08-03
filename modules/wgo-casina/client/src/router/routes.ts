import { RouteRecordRaw } from 'vue-router';
import { Paths } from './paths';
import { AuthPathRouter } from './paths/authPaths';
import { AuthAdminPathRouter } from './paths/admin/authPaths';
import { LanguagePathRouter } from './paths/admin/languagePaths';
import { TranslationPathRouter } from './paths/admin/translationPaths';
import { SettingsPathRouter } from './paths/admin/settingsPaths';
import { IndexContentAdminPathRouter } from './paths/adminCasina/indexContentPaths';
import { DoctorsAdminPathRouter } from './paths/adminCasina/doctorsContentPaths';
import { ServicesAdminPathRouter } from './paths/adminCasina/servicesContentPaths';
import { ScheduleAdminPathRouter } from './paths/adminCasina/scheduleContentPaths';
import { ContactPathRouter } from './paths/admin/contactPaths';

const routes: RouteRecordRaw[] = [
  {
    path: Paths.home.path,
    name: Paths.home.name,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: {
      auth: Paths.home.auth,
    },
  },
  IndexContentAdminPathRouter,
  ServicesAdminPathRouter,
  DoctorsAdminPathRouter,
  ScheduleAdminPathRouter,
  AuthPathRouter,
  AuthAdminPathRouter,
  LanguagePathRouter,
  TranslationPathRouter,
  ContactPathRouter,
  SettingsPathRouter,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;
