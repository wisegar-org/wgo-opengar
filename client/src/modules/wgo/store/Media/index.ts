import { Module } from 'vuex';
import state, { MediaStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import { mutations } from './mutations';

export { mediaMutations } from './mutations';
export { mediaGetters } from './getters';
export { mediaActions } from './actions';

export const mediaNamespace = 'mediaStoreModule';

export const mediaModule: Module<MediaStateInterface, any> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default mediaModule;
