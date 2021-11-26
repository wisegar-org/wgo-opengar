import { GetterTree } from 'vuex';
import { CasinaModelsStateInterface } from './state';

export const casinaModelsGettersKeys = {
  getIndexContent: 'getIndexContent'
  //RICK pon las tuyas debajo de este comentario
};

const getters: GetterTree<CasinaModelsStateInterface, any> = {
  getIndexContent(state) {
    return state.indexConent;
  }
  //RICK pon las tuyas debajo de este comentario
};

export default getters;
