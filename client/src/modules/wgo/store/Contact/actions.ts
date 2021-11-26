import { IContact } from '../../models/IContact';
import { ActionTree } from 'vuex';
import { WGOContactStateInterface } from './state';
import { contactMutations } from './mutations';
import { ServiceProvider } from '@wisegar-org/wgo-opengar-shared';
import { ContactService } from '../../services/ContactService';

const contactService: ContactService = ServiceProvider.GetScoped(ContactService);

export const contactActions = {
  saveContact: 'saveContact',
  getContact: 'getContact'
};

const actions: ActionTree<WGOContactStateInterface, any> = {
  async saveContact({ commit }, contact: IContact) {
    const result = await contactService.setContactData(contact);
    commit(contactMutations.setContactData, result)
    return result;
  },
  async getContact({ state, commit }, module: string) {
    const result = await contactService.getContactData(module);
    commit(contactMutations.setContactData, result)
    return state.contactData;
  }
};

export default actions;
