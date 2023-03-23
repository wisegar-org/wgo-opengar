import { RouteRecordRaw } from 'vue-router';
import { AdminLanguagePaths } from '@wisegar-org/wgo-base-models/build/language';

export const LanguagePathRouter: RouteRecordRaw = {
  path: AdminLanguagePaths.adminLanguage.path,
  name: AdminLanguagePaths.adminLanguage.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: AdminLanguagePaths.adminLanguage.path,
      component: () => import('pages/Admin/Language/LanguagePage.vue'),
      meta: {
        auth: AdminLanguagePaths.adminLanguage.auth,
        role: AdminLanguagePaths.adminLanguage.role,
      },
    },
  ],
};
