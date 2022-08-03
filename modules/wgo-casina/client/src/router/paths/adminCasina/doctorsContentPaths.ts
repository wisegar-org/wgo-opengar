import { RouteRecordRaw } from 'vue-router';

import { Paths } from '../../paths';

export const DoctorsAdminPathRouter: RouteRecordRaw = {
  path: Paths.adminDoctorsContent.path,
  name: Paths.adminDoctorsContent.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: Paths.adminDoctorsContent.path,
      component: () => import('pages/AdminCasina/AdminDoctorsPage.vue'),
      meta: {
        auth: Paths.adminDoctorsContent.auth,
        role: Paths.adminDoctorsContent.role,
      },
    },
  ],
};
