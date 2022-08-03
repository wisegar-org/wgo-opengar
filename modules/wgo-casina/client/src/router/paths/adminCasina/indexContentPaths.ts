import { RouteRecordRaw } from 'vue-router';

import { Paths } from '../../paths';

export const IndexContentAdminPathRouter: RouteRecordRaw = {
  path: Paths.adminIndexContent.path,
  name: Paths.adminIndexContent.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: Paths.adminIndexContent.path,
      component: () => import('pages/AdminCasina/AdminIndexContentPage.vue'),
      meta: {
        auth: Paths.adminIndexContent.auth,
        role: Paths.adminIndexContent.role,
      },
    },
  ],
};
