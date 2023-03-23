import { RouteRecordRaw } from 'vue-router';
import { IRouteObject } from '@wisegar-org/wgo-base-models/build/core';
import { translations } from '../../components/EmailMedia/translations';

export const EmailMediaPaths: IRouteObject = {
  emailMedia: {
    path: '/emailMedia',
    label: translations.TITLE,
    name: 'email_media',
    auth: true,
  },
  emailMediaDetails: {
    path: '/emailMedia/:mediaId',
    label: translations.DETAILS_TITLE,
    name: 'email_media_details',
    auth: true,
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
        auth: EmailMediaPaths.emailMedia.auth,
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
        auth: EmailMediaPaths.emailMediaDetails.auth,
      },
    },
  ],
};
