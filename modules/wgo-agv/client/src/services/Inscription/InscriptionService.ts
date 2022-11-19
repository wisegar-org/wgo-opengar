import {
  AgvInscriptionAddModel,
  AgvInscriptionInputModel,
  AgvInscriptionResponseModel,
} from "src/models/models";
import { ApiService } from "src/wgo-base/core/services/ApiService";
import {
  M_AGV_CREATE_INSCRIPTION,
  Q_AGV_ALL_INSCRIPTIONS,
} from "./InscriptionServiceQueries";

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
        fetchPolicy: "no-cache",
      })) as {
        data: { agvAllInscriptions: AgvInscriptionResponseModel[] };
      };
      if (response && response.data) {
        const {
          data: { agvAllInscriptions },
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
  ): Promise<AgvInscriptionAddModel> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_CREATE_INSCRIPTION,
        variables: {
          data: agvInscription,
        },
      })) as {
        data: {
          agvCreateInscription: AgvInscriptionAddModel;
        };
      };
      if (response && response.data && response.data) {
        const {
          data: { agvCreateInscription },
        } = response;

        return agvCreateInscription;
      }
      return { error: true } as AgvInscriptionAddModel;
    } catch (error) {
      console.log(error);
      return { error: true } as AgvInscriptionAddModel;
    }
  }
}
