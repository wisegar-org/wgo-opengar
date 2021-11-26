import { MutationTree } from 'vuex';
import { AGVComponentsStateInterface } from './state';

export const agvMutationsKeys = {
  setMenuOpen: 'setMenuOpen'
};

export const LocalStoreKeys = {
  LOCAL_STORE_OPEN_MENU: 'LOCAL_STORE_OPEN_MENU'
};

const mutation: MutationTree<AGVComponentsStateInterface> = {
  setMenuOpen(state, open): void {
    state.menuOpen = open as boolean;
    localStorage.setItem(LocalStoreKeys.LOCAL_STORE_OPEN_MENU, open);
  }
};

export default mutation;
