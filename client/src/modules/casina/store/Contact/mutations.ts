import { ContactData } from './../../models/ContactModels';
import { MutationTree } from 'vuex';
import { ContactStateInterface } from './state';

export const contactMutations = {
  setContactData: 'setContactData'
};

export const mutations: MutationTree<ContactStateInterface> = {
  setContactData(state, contactData: ContactData) {
    state.contactData = contactData
  },
};
