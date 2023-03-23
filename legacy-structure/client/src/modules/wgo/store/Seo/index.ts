import { Module } from 'vuex';
import state, { SeoStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import { mutations } from './mutations';

export { seoMutations } from './mutations';
export { seoGetters } from './getters';
export { seoActions } from './actions';

export const seoNamespace = 'seoStoreModule';

export const seoModule: Module<SeoStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default seoModule;
