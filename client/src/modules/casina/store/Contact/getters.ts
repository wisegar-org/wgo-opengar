import { GetterTree } from 'vuex';
import { ContactStateInterface } from './state';

export const contactGetters = {
  getContactData: 'getContactData'
};

const getters: GetterTree<ContactStateInterface, any> = {
  getContactData(state) {
    return state.contactData;
  }
};

export default getters;
