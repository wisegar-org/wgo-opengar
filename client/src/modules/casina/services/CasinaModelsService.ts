import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { ApiSettings } from 'src/boot/settings';
import { CasinaIndexContentInputsGql, MediaResponseGql } from 'src/graphql';
import {
  M_CASINA_ADMIN_SETINDEXCONTENT,
  Q_CASINA_ADMIN_LOADINDEXCONTENT
} from '../graphql/casinaModels';

export class CasinaModelsService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async loadCasinaIndexContent() {
    try {
      const response = (await this.apiInstance.query({
        query: Q_CASINA_ADMIN_LOADINDEXCONTENT,
        variables: {
          urlApi: ApiSettings.API_STATIC_BASE
        },
        fetchPolicy: 'no-cache'
      })) as { data: { getCasinaIndexContent: { image: MediaResponseGql } } };
      if (response && response.data && response.data) {
        const {
          data: { getCasinaIndexContent }
        } = response;

        return getCasinaIndexContent;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async setCasinaIndexContent(data: CasinaIndexContentInputsGql) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_CASINA_ADMIN_SETINDEXCONTENT,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { setCasinaIndexContent: boolean } };
      if (response && response.data && response.data) {
        const {
          data: { setCasinaIndexContent }
        } = response;

        return !!setCasinaIndexContent;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //RICK pon las tuyas debajo de este comentario
}
