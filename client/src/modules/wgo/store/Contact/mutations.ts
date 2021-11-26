import { IContact } from './../../models/IContact';
import { MutationTree } from 'vuex';
import { WGOContactStateInterface } from './state';

export const contactMutations = {
  setContactData: 'setContactData'
};

export const mutations: MutationTree<WGOContactStateInterface> = {
  setContactData(state, contactData: IContact) {
    state.contactData = contactData
  },
};
