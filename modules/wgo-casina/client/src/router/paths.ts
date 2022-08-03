import { AdminBasePath } from 'src/wgo-base/core/router';
import { IRouteObject, translations } from '../wgo-base/core/models';
import {
  translationsIndexContent,
  translationsDoctorsContent,
  translationsServicesContent,
  translationsScheduleContent,
} from 'src/models/translations';

export const Paths: IRouteObject = {
  home: {
    path: '/',
    label: translations.HOME,
    name: 'home',
    auth: false,
  },
  adminIndexContent: {
    path: `${AdminBasePath}/indexContent`,
    label: translationsIndexContent.CASINA_INDEX_CONTENT_TITLE,
    name: 'adminCasinaIndexContent',
    auth: true,
  },
  adminDoctorsContent: {
    path: `${AdminBasePath}/doctorsContent`,
    label: translationsDoctorsContent.CASINA_DOCTORS_TITLE,
    name: 'adminCasinaDoctorsContent',
    auth: true,
  },
  adminServicesContent: {
    path: `${AdminBasePath}/servicesContent`,
    label: translationsServicesContent.CASINA_SERVICES_TITLE,
    name: 'adminCasinaServicesContent',
    auth: true,
  },
  adminScheduleContent: {
    path: `${AdminBasePath}/schedule`,
    label: translationsScheduleContent.CASINA_SCHEDULE_TITLE,
    name: 'adminCasinaScheduleContent',
    auth: true,
  },
};
