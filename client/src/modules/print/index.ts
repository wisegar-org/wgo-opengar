export * from './router';
import { PrintPaths, PrintAdminPaths } from './settings/ApiSettings';

export const CASINA_MODULE_NAME = 'casina';



export const PRINT_MODULE = [
  {
    icon: 'extension',
    text: 'WGO_CASINA_MODULE_DESCRIPTION',
    title: 'WGO_CASINA_MODULE_TITLE',
    path: PrintPaths.home.url
  },
  {
    icon: 'extension',
    text: 'WGO_CASINA_ADMIN_MODULE_DESCRIPTION',
    title: 'WGO_CASINA_ADMIN_MODULE_TITLE',
    path: PrintAdminPaths.admin.url
  }
];