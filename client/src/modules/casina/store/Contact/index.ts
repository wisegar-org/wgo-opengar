import { Module } from 'vuex';
import state, { ContactStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import { mutations } from './mutations';

export { contactMutations } from './mutations';
export { contactGetters } from './getters';
export { contactActions } from './actions';

export const contactNamespace = 'contactStoreModule';

export const contactModule: Module<ContactStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default contactModule;
