import { RouteConfig } from 'vue-router';
import { PrintPaths, PrintAdminPaths } from '../settings/ApiSettings';
import {
  BreadCrumbsPrint,
  BreadCrumbsAdminPrint
} from '../settings/BreadCrumbSettings';
import { getWGOAdminRoutes } from '../../wgo/settings/RouterSettings';

export const IndexRoute = {
  path: PrintPaths.home.url,
  component: () => import('../pages/Index.vue')
};

export const AdminRedirect: RouteConfig = {
  path: PrintAdminPaths.admin.url,
};

const wgoAdminRoutes = getWGOAdminRoutes();

export const PrintLayout: RouteConfig[] = [
  {
    path: PrintPaths.home.url,
    component: () => import('../layouts/EmptyLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsPrint;
      return {
        itemsPaths: breadCrumbs
      };
    },
    children: [IndexRoute]
  },
  {
    path: PrintAdminPaths.admin.url,
    component: () => import('../../wgo/layouts/MainLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsAdminPrint;
      return {
        itemsPaths: breadCrumbs,
        showEditProfile: false
      };
    },
    children: [
      AdminRedirect,
      wgoAdminRoutes.WGO_UsersAdminRoute,
      wgoAdminRoutes.WGO_LanguageAdminRoute,
      wgoAdminRoutes.WGO_TranslationAdminRoute,
      wgoAdminRoutes.WGO_SeoAdminRoute
    ]
  }
];
