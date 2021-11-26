import { CasinaPaths, CasinaAdminPaths } from './ApiSettings';
import { getWGONavigations } from '../../wgo/settings/BreadCrumbSettings';

export const GoToHomeBC = {
  to: CasinaPaths.home.url,
  icon: 'home',
  label: CasinaPaths.home.name,
  hideMenu: false
};

export const BreadCrumbsCasina: {
  to: string;
  icon: string;
  label: string;
  roleFilter?: 'admin' | string;
  hideMenu?: boolean;
}[] = [
  GoToHomeBC
  // {
  //   to: CasinaPaths.news.url,
  //   icon: 'news',
  //   label: CasinaPaths.news.name,
  //   hideMenu: false
  // },
  // {
  //   to: CasinaPaths.contact.url,
  //   icon: 'contact',
  //   label: CasinaPaths.contact.name,
  //   hideMenu: false
  // }
];

const wgoNavigations = getWGONavigations();

export const BreadCrumbsAdminCasina: {
  to: string;
  icon: string;
  label: string;
  roleFilter?: 'admin' | string;
  hideMenu?: boolean;
}[] = [
  GoToHomeBC,
  {
    to: CasinaAdminPaths.adminIndexContent.url,
    icon: 'wysiwyg',
    label: CasinaAdminPaths.adminIndexContent.name,
    hideMenu: false
  },
  {
    to: CasinaAdminPaths.adminDoctors.url,
    icon: 'group',
    label: CasinaAdminPaths.adminDoctors.name,
    hideMenu: false
  },
  {
    to: CasinaAdminPaths.adminServices.url,
    icon: 'medical_services',
    label: CasinaAdminPaths.adminServices.name,
    hideMenu: false
  },
  {
    to: CasinaAdminPaths.adminContact.url,
    icon: 'contact_mail',
    label: CasinaAdminPaths.adminContact.name,
    hideMenu: false
  },
  {
    to: CasinaAdminPaths.adminSchedule.url,
    icon: 'event',
    label: CasinaAdminPaths.adminSchedule.name,
    hideMenu: false
  },
  wgoNavigations.WGO_UsersNavigation,
  wgoNavigations.WGO_LanguageNavigation,
  wgoNavigations.WGO_TranslationsNavigation,
  wgoNavigations.WGO_SeoNavigation
];
