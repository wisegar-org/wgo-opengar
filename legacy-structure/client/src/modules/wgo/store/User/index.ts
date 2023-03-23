import { Module } from 'vuex';
import state, { UserStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import { mutations } from './mutations';
import { getSettings } from 'src/boot/settings';

export { userMutations } from './mutations';
export { userGetters } from './getters';
export { userActions } from './actions';

const ApiSettings = getSettings();
export const userNamespace = ApiSettings.USER_NAMESPACE;

export const userModule: Module<UserStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default userModule;
