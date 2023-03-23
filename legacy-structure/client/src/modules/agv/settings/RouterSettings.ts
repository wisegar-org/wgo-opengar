import { RouteConfig } from 'vue-router';
import { AGVAdminPaths, AGVPaths, AGVDetailsPaths } from './ApiSettings';
import { BreadCrumbsAGV } from './BreadCrumbSettings';
import { getWGOAdminRoutes } from '../../wgo/settings/RouterSettings';

export const IndexRoute = {
  path: AGVPaths.home.url,
  component: () => import('../pages/Index.vue')
};

export const ComitatoRoute = {
  path: AGVPaths.comitato.url,
  component: () => import('../pages/ComitatoPage.vue')
};

export const CorsiRoute = {
  path: AGVPaths.corsi.url,
  component: () => import('../pages/CorsiPage.vue')
};

export const EventiRoute = {
  path: AGVPaths.eventi.url,
  component: () => import('../pages/EventiPage.vue')
};

export const ContattoRoute = {
  path: AGVPaths.contatto.url,
  component: () => import('../pages/ContattoPage.vue')
};

export const LinkUtiliRoute = {
  path: AGVPaths.links.url,
  component: () => import('../pages/LinkUtiliPage.vue')
};

export const DetailsEventsRoute: RouteConfig = {
  path: AGVDetailsPaths.eventiDetails.url,
  props: route => ({ itemId: route.query.id }),
  component: () => import('../pages/DetailsPage.vue')
};
export const DetailsCoursesRoute: RouteConfig = {
  path: AGVDetailsPaths.corsiDetails.url,
  props: route => ({ itemId: route.query.id }),
  component: () => import('../pages/DetailsPage.vue')
};

// export const AdminHomeRoute: RouteConfig = {
//   path: '/admin',
//   redirect: '/admin/events'
//   // meta: {
//   //   requiresAuth: true,
//   //   loginReturn: true
//   // },
//   // component: () => import('../pages/admin/AdminEventsPage.vue')
// };

export const AdminRedirect: RouteConfig = {
  path: AGVAdminPaths.admin.url,
  redirect: AGVAdminPaths.adminEvents.url
};

export const AdminEventsRoute: RouteConfig = {
  path: AGVAdminPaths.adminEvents.url,
  meta: {
    requiresAuth: true,
    loginReturn: true
  },
  component: () => import('../pages/admin/AdminEventsPage.vue')
};

export const AdminInscriptionRoute: RouteConfig = {
  path: AGVAdminPaths.adminInscriptions.url,
  // path: '/admin/events',
  meta: {
    requiresAuth: true,
    loginReturn: true
  },
  component: () => import('../pages/admin/AdminInscriptionsPage.vue')
};

const wgoAdminRoutes = getWGOAdminRoutes();

export const AGVLayout: RouteConfig[] = [
  {
    path: AGVPaths.home.url,
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      IndexRoute,
      ComitatoRoute,
      CorsiRoute,
      DetailsCoursesRoute,
      EventiRoute,
      DetailsEventsRoute,
      ContattoRoute,
      LinkUtiliRoute
    ]
  },
  {
    path: '/admin',
    component: () => import('../../wgo/layouts/MainLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsAGV;
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
      AdminEventsRoute,
      AdminInscriptionRoute,
      wgoAdminRoutes.WGO_UsersAdminRoute,
      wgoAdminRoutes.WGO_LanguageAdminRoute,
      wgoAdminRoutes.WGO_TranslationAdminRoute,
      wgoAdminRoutes.WGO_SeoAdminRoute
    ]
  }
];
