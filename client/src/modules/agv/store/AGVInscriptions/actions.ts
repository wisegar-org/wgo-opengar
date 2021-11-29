import { ServiceProvider } from '@wisegar-org/wgo-opengar-core-ui';
import { ActionTree } from 'vuex';
import { agvInscriptionsMutationsKeys } from '.';
import { AgvInscriptionInputModel } from '../../models/GraphqlModels';
import { InscriptionService } from '../../services/InscriptionService';
import { AGVInscriptionsStateInterface } from './state';

const inscriptionService: InscriptionService = ServiceProvider.GetScoped(
  InscriptionService
);

export const agvInscriptionsActionsKeys = {
  agvAllInscriptions: 'agvAllInscriptions',
  agvCreateInscription: 'agvCreateInscription'
};

const actions: ActionTree<AGVInscriptionsStateInterface, any> = {
  async agvAllInscriptions({ commit, state }, force?: false) {
    if (!!force || state.agvInscriptions.length === 0) {
      const inscriptions = await inscriptionService.allInscriptions();
      commit(agvInscriptionsMutationsKeys.setAgvInscriptions, inscriptions);
      return inscriptions;
    }
    return state.agvInscriptions;
  },
  async agvCreateInscription(
    { dispatch },
    agvInscription: AgvInscriptionInputModel
  ) {
    const result = await inscriptionService.createInscription(agvInscription);
    if (result) {
      await dispatch(agvInscriptionsActionsKeys.agvAllInscriptions, true);
    }
    return result;
  }
};

export default actions;
