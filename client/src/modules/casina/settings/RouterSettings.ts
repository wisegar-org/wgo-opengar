import { RouteConfig } from 'vue-router';
import { CasinaPaths, CasinaAdminPaths } from './ApiSettings';
import {
  BreadCrumbsCasina,
  BreadCrumbsAdminCasina
} from './BreadCrumbSettings';
import { getWGOAdminRoutes } from '../../wgo/settings/RouterSettings';

export const IndexRoute = {
  path: CasinaPaths.home.url,
  component: () => import('../pages/Index.vue')
};
const NewsRoute = {
  path: CasinaPaths.news.url,
  component: () => import('../pages/NewsPage.vue')
};
const ContactRoute = {
  path: CasinaPaths.contact.url,
  component: () => import('../pages/ContactPage.vue')
};

export const AdminRedirect: RouteConfig = {
  path: CasinaAdminPaths.admin.url,
  redirect: CasinaAdminPaths.adminIndexContent.url
};

export const AdminContactRoute: RouteConfig = {
  path: CasinaAdminPaths.adminContact.url,
  meta: {
    requiresAuth: true,
    loginReturn: true
  },
  component: () => import('../pages/admin/AdminContactPage.vue')
};

export const AdminScheduleRoute: RouteConfig = {
  path: CasinaAdminPaths.adminSchedule.url,
  meta: {
    requiresAuth: true,
    loginReturn: true
  },
  component: () => import('../pages/admin/AdminSchedulePage.vue')
};

export const AdminDoctorsRoute: RouteConfig = {
  path: CasinaAdminPaths.adminDoctors.url,
  meta: {
    requiresAuth: true,
    loginReturn: true
  },
  component: () => import('../pages/admin/AdminDoctorsPage.vue')
};

export const AdminServicesRoute: RouteConfig = {
  path: CasinaAdminPaths.adminServices.url,
  meta: {
    requiresAuth: true,
    loginReturn: true
  },
  component: () => import('../pages/admin/AdminServicesPage.vue')
};

export const AdminIndexContentRoute: RouteConfig = {
  path: CasinaAdminPaths.adminIndexContent.url,
  meta: {
    requiresAuth: true,
    loginReturn: true
  },
  component: () => import('../pages/admin/AdminIndexContentPage.vue')
};

const wgoAdminRoutes = getWGOAdminRoutes();

export const CasinaLayout: RouteConfig[] = [
  {
    path: CasinaPaths.home.url,
    component: () => import('../layouts/MainLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsCasina;
      return {
        itemsPaths: breadCrumbs
      };
    },
    children: [IndexRoute]
    // children: [IndexRoute, NewsRoute, ContactRoute]
  },
  {
    path: CasinaAdminPaths.admin.url,
    component: () => import('../../wgo/layouts/MainLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsAdminCasina;
      return {
        itemsPaths: breadCrumbs,
        showEditProfile: false
      };
      /*
      const breadCrumbs: {
        BreadCrumbsGithub: IBreadCrumbItem;
      } = require('./router.ts');
      return {
        itemsPaths: breadCrumbs.BreadCrumbsGithub
      };
      */
    },
    children: [
      AdminRedirect,
      AdminIndexContentRoute,
      AdminContactRoute,
      AdminScheduleRoute,
      AdminDoctorsRoute,
      AdminServicesRoute,
      wgoAdminRoutes.WGO_UsersAdminRoute,
      wgoAdminRoutes.WGO_LanguageAdminRoute,
      wgoAdminRoutes.WGO_TranslationAdminRoute,
      wgoAdminRoutes.WGO_SeoAdminRoute
    ]
  }
];
