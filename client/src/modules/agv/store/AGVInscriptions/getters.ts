import { GetterTree } from 'vuex';
import { AGVInscriptionsStateInterface } from './state';

export const agvInscriptionsGettersKeys = {
  getAgvInscriptions: 'getAgvInscriptions'
};

const getters: GetterTree<AGVInscriptionsStateInterface, any> = {
  getAgvInscriptions(state) {
    return state.agvInscriptions;
  }
};

export default getters;
