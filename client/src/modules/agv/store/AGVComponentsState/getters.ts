import { GetterTree } from 'vuex';
import { AGVComponentsStateInterface } from './state';

export const agvGettersKeys = {
  getMenuOpen: 'getMenuOpen'
};

const getters: GetterTree<AGVComponentsStateInterface, any> = {
  getMenuOpen(state): boolean {
    return state.menuOpen;
  }
};

export default getters;
