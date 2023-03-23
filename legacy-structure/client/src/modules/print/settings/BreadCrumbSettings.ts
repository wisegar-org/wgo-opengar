import { PrintPaths, PrintAdminPaths } from './ApiSettings';
import { getWGONavigations } from '../../wgo/settings/BreadCrumbSettings';

export const GoToHomeBC = {
  to: PrintPaths.home.url,
  icon: 'home',
  label: PrintPaths.home.name,
  hideMenu: false
};

export const BreadCrumbsPrint: {
  to: string;
  icon: string;
  label: string;
  roleFilter?: 'admin' | string;
  hideMenu?: boolean;
}[] = [
  GoToHomeBC
];

const wgoNavigations = getWGONavigations();

export const BreadCrumbsAdminPrint: {
  to: string;
  icon: string;
  label: string;
  roleFilter?: 'admin' | string;
  hideMenu?: boolean;
}[] = [
  GoToHomeBC,
  wgoNavigations.WGO_UsersNavigation,
  wgoNavigations.WGO_LanguageNavigation,
  wgoNavigations.WGO_TranslationsNavigation,
  wgoNavigations.WGO_SeoNavigation
];
