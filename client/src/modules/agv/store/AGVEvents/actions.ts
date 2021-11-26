import { ServiceProvider } from '@wisegar-org/wgo-opengar-shared';
import { ActionTree } from 'vuex';
import { AgvEventInputModel } from '../../models/GraphqlModels';
import { EventService } from '../../services/EventService';
import { agvEventsMutationsKeys } from './mutations';
import { AGVEventsStateInterface } from './state';

const eventService: EventService = ServiceProvider.GetScoped(EventService);

export const agvEventsActionsKeys = {
  agvAllEvents: 'agvAllEvents',
  agvCreateEvent: 'agvCreateEvent',
  agvModifyEvent: 'agvModifyEvent',
  agvGetEvent: 'agvGetEvent',
  agvGetEventByType: 'agvGetEventByType',
  agvGetEventsTitle: 'agvGetEventsTitle'
};

const actions: ActionTree<AGVEventsStateInterface, any> = {
  async agvAllEvents({ commit, state }, force?: false) {
    if (!!force || state.agvEvents.length === 0) {
      const events = await eventService.allEvents();
      commit(agvEventsMutationsKeys.setAgvEvents, events);
      return events;
    }
    return state.agvEvents;
  },
  async agvCreateEvent({ dispatch }, agvEvent: AgvEventInputModel) {
    const result = await eventService.createEvent(agvEvent);
    if (result) {
      await dispatch(agvEventsActionsKeys.agvAllEvents, true);
    }
    return result;
  },
  async agvModifyEvent({ dispatch }, agvEvent: AgvEventInputModel) {
    const result = await eventService.modifyEvent(agvEvent);
    if (result) {
      await dispatch(agvEventsActionsKeys.agvAllEvents, true);
    }
    return result;
  },
  async agvGetEvent({ dispatch, state }, eventId: number) {
    if (state.agvEvents.length === 0)
      await dispatch(agvEventsActionsKeys.agvAllEvents, true);

    return state.agvEvents.find(item => item.id === eventId);
  },
  async agvGetEventByType({ dispatch, state }, type: string) {
    if (state.agvEvents.length === 0)
      await dispatch(agvEventsActionsKeys.agvAllEvents, true);

    return state.agvEvents.filter(item => item.type === type);
  },
  agvGetEventsTitle({ state }) {
    return state.agvEvents
      .map(evnt => evnt.title)
      .sort((a, b) => (a > b ? 1 : -1));
  }
};

export default actions;
