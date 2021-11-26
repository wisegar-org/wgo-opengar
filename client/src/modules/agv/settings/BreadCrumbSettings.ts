import { AGVPaths, AGVAdminPaths } from '../settings/ApiSettings';
import { getWGONavigations } from '../../wgo/settings/BreadCrumbSettings';

export const GoToHomeBC = {
  to: AGVPaths.home.url,
  icon: 'home',
  label: 'Pagina Principale',
  roleFilter: 'admin',
  hideMenu: false
};

export const AdminEventsBC = {
  to: AGVAdminPaths.adminEvents.url,
  icon: 'event',
  label: AGVAdminPaths.adminEvents.name,
  roleFilter: 'admin',
  hideMenu: false
};

export const AdminInscriptionBC = {
  to: AGVAdminPaths.adminInscriptions.url,
  icon: 'how_to_reg',
  label: AGVAdminPaths.adminInscriptions.name,
  roleFilter: 'admin',
  hideMenu: false
};

const wgoNavigations = getWGONavigations();

export const BreadCrumbsAGV: {
  to: string;
  icon: string;
  label: string;
  roleFilter?: 'admin' | string;
  hideMenu?: boolean;
}[] = [
  GoToHomeBC,
  AdminEventsBC,
  AdminInscriptionBC,
  wgoNavigations.WGO_UsersNavigation,
  wgoNavigations.WGO_LanguageNavigation,
  wgoNavigations.WGO_TranslationsNavigation,
  wgoNavigations.WGO_SeoNavigation
];
