import { RouteRecordRaw } from 'vue-router';
import { AdminContactPaths } from '@wisegar-org/wgo-base-models/build/contact';

export const ContactPathRouter: RouteRecordRaw = {
  path: AdminContactPaths.adminContact.path,
  name: AdminContactPaths.adminContact.name,
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    {
      path: AdminContactPaths.adminContact.path,
      component: () => import('pages/Admin/Contact/ContactPage.vue'),
      meta: {
        auth: AdminContactPaths.adminContact.auth,
        role: AdminContactPaths.adminContact.role,
      },
    },
  ],
};
