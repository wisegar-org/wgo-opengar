import { RouteRecordRaw } from 'vue-router';

import { Paths } from '../../paths';

export const ServicesAdminPathRouter: RouteRecordRaw = {
  path: Paths.adminServicesContent.path,
  name: Paths.adminServicesContent.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: Paths.adminServicesContent.path,
      component: () => import('pages/AdminCasina/AdminServicesPage.vue'),
      meta: {
        auth: Paths.adminServicesContent.auth,
        role: Paths.adminServicesContent.role,
      },
    },
  ],
};
