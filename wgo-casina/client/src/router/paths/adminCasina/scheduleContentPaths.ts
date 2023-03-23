import { RouteRecordRaw } from 'vue-router';

import { Paths } from '../../paths';

export const ScheduleAdminPathRouter: RouteRecordRaw = {
  path: Paths.adminScheduleContent.path,
  name: Paths.adminScheduleContent.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: Paths.adminScheduleContent.path,
      component: () => import('pages/AdminCasina/AdminSchedulePage.vue'),
      meta: {
        auth: Paths.adminScheduleContent.auth,
        role: Paths.adminScheduleContent.role,
      },
    },
  ],
};
