import { Module } from 'vuex';
import state, { AGVComponentsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export { agvGettersKeys as agvComponentsGettedKeys } from './getters';
export { agvActionsKeys as agvComponentsActionsKeys } from './actions';
export {
  agvMutationsKeys as agvComponentsSettedKeys,
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
