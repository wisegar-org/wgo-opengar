import { ActionTree } from 'vuex';
import { StateInterface } from '../../../../store/index';
import { ComponentsStateInterface } from './state';
import { LocalStoreKeys, coreUIMutationsKeys } from './mutations';
import { INotify } from '../../models';

export const coreUIActionsKeys = {
  loadLocalStorageValue: 'loadLocalStorageValue',
  notify: 'notify'
};

const actions: ActionTree<ComponentsStateInterface, StateInterface> = {
  loadLocalStorageValue({ commit }) {
    let localValue =
      localStorage.getItem(LocalStoreKeys.LOCAL_STORE_OPEN_DRAWER) === 'true';
    commit(coreUIMutationsKeys.setLeftDrawerOpen, localValue);
    localValue =
      localStorage.getItem(LocalStoreKeys.LOCAL_STORE_MINSTATE_DRAWER) ===
      'true';
    commit(coreUIMutationsKeys.setLeftDrawerMinState, localValue);
  },
  notify({ commit }, notify: INotify) {
    commit(coreUIMutationsKeys.setNotify, notify);
  }
};

export default actions;
