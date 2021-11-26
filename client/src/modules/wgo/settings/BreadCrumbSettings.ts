import { HomeBC } from 'src/modules/finance';
import { IBreadCrumbItem } from '../models/IBreadCrumbItem';
import { getWGOPaths } from './ApiSettings';

export const getWGONavigations = (path = '') => {
  const paths = getWGOPaths(path);
  return {
    WGO_UsersNavigation: {
      to: paths.users.url,
      icon: 'person',
      label: paths.users.name || 'Users',
      roleFilter: 'superAdmin, admin'
    },
    WGO_LanguageNavigation: {
      to: paths.languages.url,
      icon: 'language',
      label: paths.languages.name || 'Languages',
      roleFilter: 'superAdmin, admin'
    },
    WGO_TranslationsNavigation: {
      to: paths.translations.url,
      icon: 'translate',
      label: paths.translations.name || 'Translations',
      roleFilter: 'superAdmin, admin'
    },
    WGO_SeoNavigation: {
      to: paths.seo.url,
      icon: 'gpp_good',
      label: paths.seo.name || 'Seo',
      roleFilter: 'superAdmin, admin'
    }
  };
};

const navigations = getWGONavigations();

const items: IBreadCrumbItem[] = [
  navigations.WGO_UsersNavigation,
  navigations.WGO_LanguageNavigation,
  navigations.WGO_TranslationsNavigation,
  navigations.WGO_SeoNavigation
];

export const BreadCrumbsItems = items;
