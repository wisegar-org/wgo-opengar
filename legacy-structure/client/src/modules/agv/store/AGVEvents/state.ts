import { AgvEventResponseModel } from '../../models/GraphqlModels';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AGVEventsStateInterface {
  agvEvents: AgvEventResponseModel[];
}

function state(): AGVEventsStateInterface {
  return {
    agvEvents: []
  };
}

export default state;
export const AGVEventStateModule = state;
