import { Module } from 'vuex';
import state, { WGOContactStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import { mutations } from './mutations';

export { contactMutations } from './mutations';
export { contactGetters } from './getters';
export { contactActions } from './actions';

export const wgoContactNamespace = 'WGOContactStoreModule';

export const wgoContactModule: Module<WGOContactStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default wgoContactModule;
