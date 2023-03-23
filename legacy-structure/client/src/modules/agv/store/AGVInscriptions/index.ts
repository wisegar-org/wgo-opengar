import { Module } from 'vuex';
import state, { AGVInscriptionsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export { agvInscriptionsGettersKeys } from './getters';
export { agvInscriptionsActionsKeys } from './actions';
export { agvInscriptionsMutationsKeys } from './mutations';

export const agvInscriptionsNamespace = 'agvInscriptionsModule';

export const agvInscriptionsModule: Module<
  AGVInscriptionsStateInterface,
  any
> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default agvInscriptionsModule;
