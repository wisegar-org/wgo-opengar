import { RouteRecordRaw } from 'vue-router';
import { Paths } from './paths';
import { AuthPathRouter } from './paths/authPaths';
import { AuthAdminPathRouter } from './paths/admin/authPaths';
import { EmailMediaPathRouter } from './paths/emailMediaPaths';
import { EmployeesPathRouter } from './paths/employeesPaths';
import { LanguagePathRouter } from './paths/admin/languagePaths';
import { TranslationPathRouter } from './paths/admin/translationPaths';
import { SettingsPathRouter } from './paths/admin/settingsPaths';

const routes: RouteRecordRaw[] = [
  {
    path: Paths.home.path,
    name: Paths.home.name,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: {
      auth: false,
    },
  },
  AuthPathRouter,
  EmailMediaPathRouter,
  EmployeesPathRouter,
  AuthAdminPathRouter,
  LanguagePathRouter,
  TranslationPathRouter,
  SettingsPathRouter,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
