import { Module } from 'vuex';
import state, { ComponentsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export { coreUIGettersKeys as componentsGettedKeys } from './getters';
export { coreUIActionsKeys as componentsActionsKeys } from './actions';
export {
  coreUIMutationsKeys as componentsSettedKeys,
  LocalStoreKeys
} from './mutations';

export const componentsNamespace = 'componentsModule';

export const componentsModule: Module<ComponentsStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default componentsModule;
