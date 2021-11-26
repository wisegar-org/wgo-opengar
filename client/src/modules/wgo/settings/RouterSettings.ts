import { RouteConfig } from 'vue-router';
import { getWGOPaths, OpengarPaths } from './ApiSettings';
import { WGOPaths } from '../settings/ApiSettings';
import { BreadCrumbsItems } from './BreadCrumbSettings';

// export const IndexRoute: RouteConfig = {
//   path: OpengarPaths.home.url,
//   component: () => import('../pages/Index.vue')
// };

export const LoginRoute = {
  path: OpengarPaths.login.url,
  props: (route: { query: { toPath: string } }) => ({
    toPath: route.query.toPath
  }),
  component: () => import('../pages/Auth/Login.vue')
};

export const routesEmptyLayout: RouteConfig = {
  path: OpengarPaths.auth.url,
  component: () => import('../layouts/EmptyLayout.vue'),
  children: [
    LoginRoute,
    // {
    //   path: OpengarPaths.register.url,
    //   component: () => import('../pages/Auth/RegisterUser.vue')
    // },
    {
      path: OpengarPaths.checkEmailConfirmation.url,
      props: true,
      component: () => import('../pages/Auth/EmailConfirmation.vue')
    },
    {
      path: OpengarPaths.resendEmailConfirmation.url,
      component: () => import('../pages/Auth/ResendEmailConfirmation.vue')
    },
    {
      path: OpengarPaths.sentedEmailConfirmation.url,
      component: () => import('../pages/Auth/SentedEmailConfirmation.vue')
    }
  ]
};

export const getWGOAdminRoutes = (path = '') => {
  const paths = getWGOPaths(path);
  return {
    WGO_UsersAdminRoute: {
      path: paths.users.url,
      component: () => import('../pages/Users/UsersList.vue'),
      meta: { requiresAuth: true, loginReturn: true }
    },
    WGO_LanguageAdminRoute: {
      path: paths.languages.url,
      component: () => import('../pages/Languages/LanguagesPage.vue'),
      meta: { requiresAuth: true, loginReturn: true }
    },
    WGO_TranslationAdminRoute: {
      path: paths.translations.url,
      component: () => import('../pages/Translations/TranslationsPage.vue'),
      meta: { requiresAuth: true, loginReturn: true }
    },
    WGO_SeoAdminRoute: {
      path: paths.seo.url,
      component: () => import('../pages/Seo/SeoPage.vue'),
      meta: { requiresAuth: true, loginReturn: true }
    }
  };
};

const wgoAdminRoutes = getWGOAdminRoutes();

export const IndexAdminRoute = {
  path: '/admin',
  redirect: wgoAdminRoutes.WGO_UsersAdminRoute.path,
  meta: { requiresAuth: true, loginReturn: true }
};

export const IndexRedirectRoute = {
  path: '/',
  redirect: wgoAdminRoutes.WGO_UsersAdminRoute.path,
  meta: { requiresAuth: true, loginReturn: true }
};

export const AdminWGOLayout: RouteConfig[] = [
  IndexRedirectRoute,
  {
    path: WGOPaths.home.url,
    component: () => import('../layouts/MainLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsItems;
      return {
        itemsPaths: breadCrumbs
      };
    },
    children: [
      IndexAdminRoute,
      wgoAdminRoutes.WGO_UsersAdminRoute,
      wgoAdminRoutes.WGO_LanguageAdminRoute,
      wgoAdminRoutes.WGO_TranslationAdminRoute,
      wgoAdminRoutes.WGO_SeoAdminRoute
    ]
  }
];

export const WGOLayout: RouteConfig[] = [routesEmptyLayout].concat(
  AdminWGOLayout
);
