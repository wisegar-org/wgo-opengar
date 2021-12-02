export * from './router';
import { PrintPaths, PrintAdminPaths } from './settings/ApiSettings';

export const PRINT_MODULE_NAME = 'print';



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