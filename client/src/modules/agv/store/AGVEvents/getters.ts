import { GetterTree } from 'vuex';
import { AGVEventsStateInterface } from './state';

export const agvEventsGettersKeys = {
  getAgvEvents: 'getAgvEvents'
};

const getters: GetterTree<AGVEventsStateInterface, any> = {
  getAgvEvents(state) {
    return state.agvEvents;
  }
};

export default getters;
