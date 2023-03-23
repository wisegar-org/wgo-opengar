export * from './router';
export { CasinaPaths, CasinaAdminPaths } from './settings/ApiSettings';

export const CASINA_MODULE_NAME = 'casina';

import { CasinaPaths, CasinaAdminPaths } from './settings/ApiSettings';

export const CASINA_MODULE = [
  {
    icon: 'extension',
    text: 'WGO_CASINA_MODULE_DESCRIPTION',
    title: 'WGO_CASINA_MODULE_TITLE',
    path: CasinaPaths.home.url
  },
  {
    icon: 'extension',
    text: 'WGO_CASINA_ADMIN_MODULE_DESCRIPTION',
    title: 'WGO_CASINA_ADMIN_MODULE_TITLE',
    path: CasinaAdminPaths.admin.url
  }
];
