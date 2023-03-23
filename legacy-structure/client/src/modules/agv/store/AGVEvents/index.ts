import { Module } from 'vuex';
import state, { AGVEventsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export { agvEventsGettersKeys } from './getters';
export { agvEventsActionsKeys } from './actions';
export { agvEventsMutationsKeys } from './mutations';

export const agvEventsNamespace = 'agvEventsModule';

export const agvEventsModule: Module<AGVEventsStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default agvEventsModule;
