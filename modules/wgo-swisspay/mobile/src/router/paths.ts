import { IRouteObject, translations } from '@wisegar-org/wgo-base-models';

export const Paths: IRouteObject = {
  home: {
    path: '/',
    label: translations.HOME,
    name: 'home',
    auth: false,
  },
};
