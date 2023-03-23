import { ContactData } from './../../models/ContactModels';
import { ActionTree } from 'vuex';
import { ContactStateInterface } from './state';
import { contactMutations } from './mutations';
import { ServiceProvider } from '@wisegar-org/wgo-opengar-core-ui';
import { ContactService } from '../../services/ContactService';

const contactService: ContactService = ServiceProvider.GetScoped(
  ContactService
);

export const contactActions = {
  saveContact: 'saveContact',
  getContact: 'getContact'
};

const actions: ActionTree<ContactStateInterface, any> = {
  async saveContact({ commit }, contact: ContactData) {
    const result = await contactService.setContactData(contact);
    commit(contactMutations.setContactData, result);
    return result;
  },
  async getContact({ state, commit }) {
    const result = await contactService.getContactData();
    commit(contactMutations.setContactData, result);
    return state.contactData;
  }
};

export default actions;
