import { Module } from 'vuex';
import state, { CasinaModelsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export { casinaModelsGettersKeys } from './getters';
export { casinaModelsActionsKeys } from './actions';
export { casinaModelsMutationsKeys } from './mutations';

export const casinaModelsNamespace = 'casinaModelsModule';

export const casinaModelsModule: Module<CasinaModelsStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default casinaModelsModule;
