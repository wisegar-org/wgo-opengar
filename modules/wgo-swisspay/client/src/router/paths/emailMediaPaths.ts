import { RouteLocationRaw, RouteParamsRaw, RouteRecordRaw } from 'vue-router';
import { Paths } from '../paths';
import { IRouteObject } from '../../../../../wgo-base/core/models';

export const EmailMediaPaths: IRouteObject = {
  emailMedia: {
    path: '/emailMedia',
    label: 'Email Media',
    name: 'email_media',
  },
  emailMediaDetails: {
    path: '/emailMedia/:mediaId',
    label: 'Email Media Details',
    name: 'email_media_details',
  },
};

export const EmailMediaPathRouter: RouteRecordRaw = {
  path: EmailMediaPaths.emailMedia.path,
  name: EmailMediaPaths.emailMedia.name,
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: EmailMediaPaths.emailMedia.path,
      component: () => import('pages/EmailMedia/EmailMediaPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: EmailMediaPaths.emailMediaDetails.path,
      component: () => import('pages/EmailMedia/EmailMediaDetailsPage.vue'),
      props: ({ params }) => {
        return {
          mediaId: parseInt((params as any).mediaId),
        };
      },
      meta: {
        auth: true,
      },
    },
  ],
};
