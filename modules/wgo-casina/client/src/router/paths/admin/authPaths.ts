import { RouteRecordRaw } from 'vue-router';
import { AuthPaths } from '@wisegar-org/wgo-base-models/build/authentication';

export const AuthAdminPathRouter: RouteRecordRaw = {
  path: AuthPaths.authUsers.path,
  name: AuthPaths.authUsers.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: AuthPaths.authUsers.path,
      component: () => import('pages/Admin/AuthUser/AuthUserPage.vue'),
      meta: {
        auth: AuthPaths.authUsers.auth,
        role: AuthPaths.authUsers.role,
      },
    },
  ],
};
