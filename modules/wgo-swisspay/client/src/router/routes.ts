import { RouteRecordRaw } from 'vue-router';
import { Paths } from './paths';
import { AuthPathRouter } from './paths/authPaths';
import { EmailMediaPathRouter } from './paths/emailMediaPaths';
import { LanguagePathRouter } from './paths/admin/languagePaths';

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
  LanguagePathRouter,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
