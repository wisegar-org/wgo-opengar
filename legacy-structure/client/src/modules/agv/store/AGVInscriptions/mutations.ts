import { MutationTree } from 'vuex';
import { AgvInscriptionResponseModel } from '../../models/GraphqlModels';
import { AGVInscriptionsStateInterface } from './state';

export const agvInscriptionsMutationsKeys = {
  setAgvInscriptions: 'setAgvInscriptions'
};

const mutation: MutationTree<AGVInscriptionsStateInterface> = {
  setAgvInscriptions(state, inscriptions: AgvInscriptionResponseModel[]) {
    state.agvInscriptions = inscriptions;
  }
};

export default mutation;
