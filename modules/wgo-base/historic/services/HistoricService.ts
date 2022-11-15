import { ApiService } from "@wisegar-org/wgo-opengar-core-ui";
import { HistoricPageInput } from "../resolvers/HistoricInputs";
import {
  HistoricFiltersResponse,
  HistoricPageResponse,
} from "../resolvers/HistoricResponses";
import {
  HISTORIC_PATH_GET_FILTERS,
  HISTORIC_PATH_GET_PAGE,
} from "../router/server";
import { Q_HISTORIC_FILTER, Q_HISTORIC_PAGE } from "./HistoricServiceQueries";

export class HistoricService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getHistoricPage(
    data: HistoricPageInput
  ): Promise<HistoricPageResponse> {
    try {
      const response = (await this.apiService.query({
        query: Q_HISTORIC_PAGE,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [HISTORIC_PATH_GET_PAGE]: unknown } };

      if (response.data && response.data[HISTORIC_PATH_GET_PAGE]) {
        const { data } = response;
        return data[HISTORIC_PATH_GET_PAGE] as HistoricPageResponse;
      }
      return {
        count: 0,
        histories: [],
      };
    } catch (error) {
      throw `HistoricService getHistoricPage: ${error as string}`;
    }
  }

  public async getHistoricFilter(): Promise<HistoricFiltersResponse> {
    try {
      const response = (await this.apiService.query({
        query: Q_HISTORIC_FILTER,
        variables: {},
        fetchPolicy: "no-cache",
      })) as { data: { [HISTORIC_PATH_GET_FILTERS]: unknown } };

      if (response.data && response.data[HISTORIC_PATH_GET_FILTERS]) {
        const { data } = response;
        return data[HISTORIC_PATH_GET_FILTERS] as HistoricFiltersResponse;
      }
      return {
        actions: [],
        entities: [],
        usernames: [],
      };
    } catch (error) {
      throw `HistoricService getHistoricFilter: ${error as string}`;
    }
  }
}
