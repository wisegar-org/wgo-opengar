import { Module } from 'vuex';
import state, { LanguageStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import { mutations } from './mutations';

export { languageMutations } from './mutations';
export { languageGetters } from './getters';
export { languageActions } from './actions';

export const languageNamespace = 'languageStoreModule';

export const languageModule: Module<LanguageStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default languageModule;
