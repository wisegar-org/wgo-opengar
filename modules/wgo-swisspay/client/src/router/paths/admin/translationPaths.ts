import { SUPERADMIN } from '../../../../../../wgo-base/authentication/models';
import { RouteRecordRaw } from 'vue-router';
import { AdminTranslationPaths } from '../../../../../../wgo-base/translation/router';

export const TranslationPathRouter: RouteRecordRaw = {
  path: AdminTranslationPaths.adminTranslation.path,
  name: AdminTranslationPaths.adminTranslation.name,
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: AdminTranslationPaths.adminTranslation.path,
      component: () => import('pages/Admin/Translation/TranslationPage.vue'),
      meta: {
        auth: true,
        role: [SUPERADMIN],
      },
    },
  ],
};
