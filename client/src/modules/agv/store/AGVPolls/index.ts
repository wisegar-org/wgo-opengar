import { Module } from 'vuex';
import state, { AGVPollsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export { agvPollsGettersKeys } from './getters';
export { agvPollsActionsKeys } from './actions';
export { agvPollsMutationsKeys } from './mutations';

export const agvPollsNamespace = 'agvPollsModule';

export const agvPollsModule: Module<AGVPollsStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default agvPollsModule;
