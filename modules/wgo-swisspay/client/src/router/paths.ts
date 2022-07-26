import { IRouteObject, translations } from '../wgo-base/core/models';

export const Paths: IRouteObject = {
  home: {
    path: '/',
    label: translations.HOME,
    name: 'home',
    auth: false,
  },
};
