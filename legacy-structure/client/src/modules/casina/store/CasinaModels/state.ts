import { IndexContentModel } from '../../models/IndexContentModels';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CasinaModelsStateInterface {
  indexConent: IndexContentModel;
  //RICK pon las tuyas debajo de este comentario
}

function state(): CasinaModelsStateInterface {
  return {
    indexConent: {}
    //RICK pon las tuyas debajo de este comentario
  };
}

export default state;
export const CasinaModelsComponentStateModule = state;
