import { ApiService } from "@wisegar-org/wgo-base-client/build/core/services/ApiService";
import { ApiSettingsConfig } from "src/api/ApiOptions";
import {
  M_WISEGAR_SET_INDEXCONTENT,
  Q_WISEGAR_LOAD_INDEXCONTENT,
} from "./IndexContentServiceQueries";
import {
  IIndexContentInput,
  IIndexContentModel,
} from "../../../../src/models/IndexContent";

export class IndexContentService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }
  async loadIndexContent() {
    try {
      const response = (await this.apiInstance.query({
        query: Q_WISEGAR_LOAD_INDEXCONTENT,
        variables: {
          urlApi: ApiSettingsConfig.API_BASE,
        },
        fetchPolicy: "no-cache",
      })) as { data: { getIndexContent: IIndexContentModel } };
      if (response && response.data && response.data) {
        const {
          data: { getIndexContent },
        } = response;

        return getIndexContent;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async setIndexContent(data: IIndexContentInput) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_WISEGAR_SET_INDEXCONTENT,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { setIndexContent: boolean } };
      if (response && response.data && response.data) {
        const {
          data: { setIndexContent },
        } = response;

        return !!setIndexContent;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
