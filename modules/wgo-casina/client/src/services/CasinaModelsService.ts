import { ApiSettingsConfig } from 'src/api/ApiOptions';
import { IMediaModel } from 'src/wgo-base/core/models';
import { ApiService } from 'src/wgo-base/core/services/ApiService';
import { M_CASINA_ADMIN_SETINDEXCONTENT, Q_CASINA_ADMIN_LOADINDEXCONTENT } from './CasinaModelsServiceQueries';

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
          urlApi: ApiSettingsConfig.API_BASE,
        },
        fetchPolicy: 'no-cache',
      })) as { data: { getCasinaIndexContent: { image: IMediaModel } } };
      if (response && response.data && response.data) {
        const {
          data: { getCasinaIndexContent },
        } = response;

        return getCasinaIndexContent;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async setCasinaIndexContent(data: any) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_CASINA_ADMIN_SETINDEXCONTENT,
        variables: {
          data: data,
        },
        fetchPolicy: 'no-cache',
      })) as { data: { setCasinaIndexContent: boolean } };
      if (response && response.data && response.data) {
        const {
          data: { setCasinaIndexContent },
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
