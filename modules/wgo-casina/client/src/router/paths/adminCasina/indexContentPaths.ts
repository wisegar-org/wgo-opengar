import { RouteRecordRaw } from 'vue-router';
import { AdminBasePath } from 'src/wgo-base/core/router';
import { Paths } from '../../paths';

export const IndexContentAdminPathRouter: RouteRecordRaw = {
  path: Paths.adminIndexContent.path,
  name: Paths.adminIndexContent.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: AdminBasePath,
      redirect: Paths.adminIndexContent.path,
    },
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
