import { Module } from 'vuex';
import state, { AGVComponentsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export { agvGettersKeys as componentsGettedKeys } from './getters';
export { agvActionsKeys as componentsActionsKeys } from './actions';
export {
  agvMutationsKeys as componentsSettedKeys,
  LocalStoreKeys
} from './mutations';

export const agvComponentsNamespace = 'agvComponentsModule';

export const agvComponentsModule: Module<AGVComponentsStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default agvComponentsModule;
