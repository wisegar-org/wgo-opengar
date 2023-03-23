export * from './router';
export { WGOPaths } from './settings/ApiSettings';

export const WGO_MODULE_NAME = 'wgo';

import { WGOPaths } from './settings/ApiSettings';

export const WGO_MODULE = [
  {
    icon: 'settings',
    text: 'WGO_ADMIN_MODULE_DESCRIPTION',
    title: 'WGO_ADMIN_MODULE_TITLE',
    path: WGOPaths.users.url
  }
];
