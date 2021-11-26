// import { ApiSettings } from '../settings/ApiSettings';
import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import {
  M_AGV_CREATE_INSCRIPTION,
  Q_AGV_ALL_INSCRIPTIONS
} from '../graphql/inscriptions';
import {
  AgvInscriptionInputModel,
  AgvInscriptionResponseModel
} from '../models/GraphqlModels';

export class InscriptionService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async allInscriptions(): Promise<AgvInscriptionResponseModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_ALL_INSCRIPTIONS,
        variables: {},
        fetchPolicy: 'no-cache'
      })) as {
        data: { agvAllInscriptions: AgvInscriptionResponseModel[] };
      };
      if (response && response.data) {
        const {
          data: { agvAllInscriptions }
        } = response;
        return agvAllInscriptions;
      } else return [];
    } catch (error) {
      //
      console.log(error);
      return [];
    }
  }

  async createInscription(
    agvInscription: AgvInscriptionInputModel
  ): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_CREATE_INSCRIPTION,
        variables: {
          data: agvInscription
        }
      })) as { data: { agvCreateInscription: boolean } };
      if (response && response.data && response.data) {
        const {
          data: { agvCreateInscription }
        } = response;

        return !!agvCreateInscription;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
