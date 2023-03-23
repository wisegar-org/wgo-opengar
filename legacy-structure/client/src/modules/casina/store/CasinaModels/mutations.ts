import { MutationTree } from 'vuex';
import { IndexContentModel } from '../../models/IndexContentModels';
import { CasinaModelsStateInterface } from './state';

export const casinaModelsMutationsKeys = {
  setIndexContent: 'setIndexContent'
  //RICK pon las tuyas debajo de este comentario
};

const mutation: MutationTree<CasinaModelsStateInterface> = {
  setIndexContent(state, data: IndexContentModel) {
    state.indexConent = data;
  }
  //RICK pon las tuyas debajo de este comentario
};

export default mutation;
