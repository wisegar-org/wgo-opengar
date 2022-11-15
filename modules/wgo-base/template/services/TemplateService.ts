import { ApiService } from "../../core/services/ApiService";
import { TemplateInput } from "../resolvers/TemplateInputs";
import { TemplateResponse } from "../resolvers/TemplateResponses";
import {
  TEMPLATE_PATH_GET_BY_TYPE,
  TEMPLATE_PATH_POST,
} from "../router/server";
import {
  M_TEMPLATE_SET,
  Q_TEMPLATE_GET_BY_TYPE,
} from "./TemplateServiceQueries";

export class TemplateService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getTemplateByType(type: string) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_TEMPLATE_GET_BY_TYPE,
        variables: {
          type: type,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { [TEMPLATE_PATH_GET_BY_TYPE]: TemplateResponse };
      };
      if (
        response &&
        response.data &&
        response.data[TEMPLATE_PATH_GET_BY_TYPE]
      ) {
        const { data } = response;
        return data[TEMPLATE_PATH_GET_BY_TYPE];
      } else return undefined;
    } catch (error) {
      throw `TemplateService getTemplateByType: ${error as string}`;
    }
  }

  async setTemplate(params: TemplateInput) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_TEMPLATE_SET,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { [TEMPLATE_PATH_POST]: boolean };
      };
      if (response && response.data && response.data[TEMPLATE_PATH_POST]) {
        const { data } = response;
        return data[TEMPLATE_PATH_POST];
      }
      return false;
    } catch (error) {
      throw `TemplateService setTemplate: ${error as string}`;
    }
  }
}
