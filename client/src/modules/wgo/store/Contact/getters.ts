import { GetterTree } from 'vuex';
import { WGOContactStateInterface } from './state';

export const contactGetters = {
  getContactData: 'getContactData'
};

const getters: GetterTree<WGOContactStateInterface, any> = {
  getContactData(state) {
    return state.contactData;
  }
};

export default getters;
