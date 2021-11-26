import { MutationTree } from 'vuex';
import { INavigationTo, INotify } from '../../models';
import { ComponentsStateInterface } from './state';

export const coreUIMutationsKeys = {
  setLeftDrawerOpen: 'setLeftDrawerOpen',
  setLeftDrawerMinState: 'setLeftDrawerMinState',
  pushRouterHistory: 'pushRouterHistory',
  removeItemRouterHistory: 'removeItemRouterHistory',
  setRouterHistory: 'setRouterHistory',
  setNotify: 'setNotify',
  setInnerLoading: 'setInnerLoading'
};

export const LocalStoreKeys = {
  LOCAL_STORE_OPEN_DRAWER: 'LOCAL_STORE_OPEN_DRAWER',
  LOCAL_STORE_MINSTATE_DRAWER: 'LOCAL_STORE_MINSTATE_DRAWER'
};

const mutation: MutationTree<ComponentsStateInterface> = {
  setLeftDrawerOpen(state, open): void {
    state.leftDrawerOpen = open as boolean;
    localStorage.setItem(LocalStoreKeys.LOCAL_STORE_OPEN_DRAWER, open);
  },
  setLeftDrawerMinState(state, open): void {
    state.leftDrawerMinState = open as boolean;
    localStorage.setItem(LocalStoreKeys.LOCAL_STORE_MINSTATE_DRAWER, open);
  },
  pushRouterHistory(state, item): void {
    state.routerHistory.push(item);
  },
  removeItemRouterHistory(state, index): void {
    state.routerHistory.slice(index, 1);
  },
  setRouterHistory(state, items: INavigationTo[]): void {
    state.routerHistory = items;
  },
  setNotify(state, notify: INotify): void {
    state.notify = notify;
  },
  setInnerLoading(state, loading: boolean) {
    state.innerLoading = loading;
  }
};

export default mutation;
