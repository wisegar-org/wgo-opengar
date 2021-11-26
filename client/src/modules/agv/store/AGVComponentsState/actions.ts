import { ActionTree } from 'vuex';
import { AGVComponentsStateInterface } from './state';
import { LocalStoreKeys, agvMutationsKeys } from './mutations';

export const agvActionsKeys = {
  loadLocalStorageValue: 'loadLocalStorageValue'
};

const actions: ActionTree<AGVComponentsStateInterface, any> = {
  loadLocalStorageValue({ commit }) {
    const localValue =
      localStorage.getItem(LocalStoreKeys.LOCAL_STORE_OPEN_MENU) === 'true';
    commit(agvMutationsKeys.setMenuOpen, localValue);
  }
};

export default actions;
