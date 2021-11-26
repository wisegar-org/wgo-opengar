import { INavigationTo, INotify } from '../../models';
export interface ComponentsStateInterface {
  leftDrawerOpen: boolean;
  leftDrawerMinState: boolean;
  routerHistory: INavigationTo[];
  notify: INotify;
  innerLoading: boolean;
}

function state(): ComponentsStateInterface {
  return {
    leftDrawerOpen: false,
    leftDrawerMinState: true,
    routerHistory: [],
    notify: <INotify>{},
    innerLoading: false
  };
}

export default state;
