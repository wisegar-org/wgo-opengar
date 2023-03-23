import { Module } from 'vuex';
import state, { EmailStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import { mutations } from './mutations';

export { emailMutations } from './mutations';
export { emailGetters } from './getters';
export { emailActions } from './actions';

export const emailNamespace = 'emailStoreModule';

export const emailModule: Module<EmailStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default emailModule;
