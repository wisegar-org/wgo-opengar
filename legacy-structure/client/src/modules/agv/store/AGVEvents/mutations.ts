import { MutationTree } from 'vuex';
import { AgvEventResponseModel } from '../../models/GraphqlModels';
import { AGVEventsStateInterface } from './state';

export const agvEventsMutationsKeys = {
  setAgvEvents: 'setAgvEvents'
};

const mutation: MutationTree<AGVEventsStateInterface> = {
  setAgvEvents(state, events: AgvEventResponseModel[]) {
    state.agvEvents = events;
  }
};

export default mutation;
