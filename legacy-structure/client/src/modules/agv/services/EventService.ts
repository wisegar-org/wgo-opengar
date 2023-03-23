// import { ApiSettings } from '../settings/ApiSettings';
import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { ApiSettings } from 'src/boot/settings';
import {
  M_AGV_CREATE_EVENTS,
  M_AGV_MODIFY_EVENTS,
  Q_AGV_ALL_EVENTS
} from '../graphql/events';
import {
  AgvEventInputModel,
  AgvEventResponseModel
} from '../models/GraphqlModels';

export class EventService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async allEvents(): Promise<AgvEventResponseModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_ALL_EVENTS,
        variables: {
          urlApi: ApiSettings.API_STATIC_BASE
        },
        fetchPolicy: 'no-cache'
      })) as {
        data: { agvAllEvents: AgvEventResponseModel[] };
      };
      if (response && response.data) {
        const {
          data: { agvAllEvents }
        } = response;
        return agvAllEvents;
      } else return [];
    } catch (error) {
      //
      console.log(error);
      return [];
    }
  }

  async createEvent(agvEvent: AgvEventInputModel): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_CREATE_EVENTS,
        variables: {
          data: agvEvent
        }
      })) as { data: { agvCreateEvent: boolean } };
      if (response && response.data && response.data) {
        const {
          data: { agvCreateEvent }
        } = response;

        return !!agvCreateEvent;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async modifyEvent(agvEvent: AgvEventInputModel): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_MODIFY_EVENTS,
        variables: {
          data: agvEvent
        }
      })) as { data: { agvModifyEvent: boolean } };

      if (response && response.data && response.data) {
        const {
          data: { agvModifyEvent }
        } = response;

        return agvModifyEvent;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
