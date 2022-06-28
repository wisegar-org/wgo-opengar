import { SUPERADMIN } from '../../../../../../wgo-base/authentication/models';
import { RouteRecordRaw } from 'vue-router';
import { AdminLanguagePaths } from '../../../../../../wgo-base/language/router';

export const LanguagePathRouter: RouteRecordRaw = {
  path: AdminLanguagePaths.adminLanguage.path,
  name: AdminLanguagePaths.adminLanguage.name,
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: AdminLanguagePaths.adminLanguage.path,
      component: () => import('pages/Admin/Language/LanguagePage.vue'),
      meta: {
        auth: true,
        role: [SUPERADMIN],
      },
    },
  ],
};
