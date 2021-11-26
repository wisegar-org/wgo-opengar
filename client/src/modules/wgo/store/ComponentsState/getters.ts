import { GetterTree } from 'vuex';
import { StateInterface } from '../../../../store/index';
import { INavigationTo, INotify } from '../../models';
import { ComponentsStateInterface } from './state';

export const coreUIGettersKeys = {
  getLeftDrawerOpen: 'getLeftDrawerOpen',
  getLeftDrawerMinState: 'getLeftDrawerMinState',
  getRouterHistory: 'getRouterHistory',
  getNotify: 'getNotify',
  getInnerLoagind: 'getInnerLoagind'
};

const getters: GetterTree<ComponentsStateInterface, StateInterface> = {
  getLeftDrawerOpen(state): boolean {
    return state.leftDrawerOpen;
  },
  getLeftDrawerMinState(state): boolean {
    return state.leftDrawerMinState;
  },
  getRouterHistory(state): INavigationTo[] {
    return state.routerHistory;
  },
  getNotify(state): INotify {
    return state.notify;
  },
  getInnerLoagind(state): boolean {
    return state.innerLoading;
  }
};

export default getters;
