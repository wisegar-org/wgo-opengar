import { AgvInscriptionResponseModel } from '../../models/GraphqlModels';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AGVInscriptionsStateInterface {
  agvInscriptions: AgvInscriptionResponseModel[];
}

function state(): AGVInscriptionsStateInterface {
  return {
    agvInscriptions: []
  };
}

export default state;
export const AGVInscriptionStateModule = state;
