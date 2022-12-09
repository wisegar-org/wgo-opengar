import { AdminContactPaths } from "src/wgo-base/models/contact/router";
import { RouteRecordRaw } from "vue-router";

export const ContactPathRouter: RouteRecordRaw = {
  path: AdminContactPaths.adminContact.path,
  name: AdminContactPaths.adminContact.name,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AdminContactPaths.adminContact.path,
      component: () => import("pages/Admin/Contact/ContactPage.vue"),
      meta: {
        auth: AdminContactPaths.adminContact.auth,
        role: AdminContactPaths.adminContact.role,
      },
    },
  ],
};
