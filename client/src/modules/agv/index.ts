export * from './router';
export * from './settings';
export * from './settings/ApiSettings';

export const AGV_MODULE_NAME = 'agv';

import { AGVPaths, AGVAdminPaths } from './settings/ApiSettings';

export const AGV_MODULE = [
  {
    icon: 'extension',
    text: 'WGO_AGV_MODULE_DESCRIPTION',
    title: 'WGO_AGV_MODULE_TITLE',
    path: AGVPaths.home.url
  },
  {
    icon: 'extension',
    text: 'WGO_AGV_ADMIN_MODULE_DESCRIPTION',
    title: 'WGO_AGV_ADMIN_MODULE_TITLE',
    path: AGVAdminPaths.admin.url
  }
];
