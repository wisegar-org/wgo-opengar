import { SUPERADMIN } from '../../../../../../wgo-base/authentication/models';
import { RouteRecordRaw } from 'vue-router';
import { AuthPaths } from '../../../../../../wgo-base/authentication/router';

export const AuthAdminPathRouter: RouteRecordRaw = {
  path: AuthPaths.authUsers.path,
  name: AuthPaths.authUsers.name,
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: AuthPaths.authUsers.path,
      component: () => import('pages/Admin/AuthUser/AuthUserPage.vue'),
      meta: {
        auth: true,
        role: [SUPERADMIN],
      },
    },
  ],
};
