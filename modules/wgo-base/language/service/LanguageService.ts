import { ApiService } from "../../core/services/ApiService";
import {
  M_LANGUAGE_POST,
  M_LANGUAGE_PUT,
  Q_LANGUAGE_GETALL,
} from "./LanguageServiceQueries";
import "../models";
import { ILanguageModel, ILanguagePostArg } from "../models";
import {
  LANGUAGE_PATH_GET_ALL_LANGUAGE,
  LANGUAGE_PATH_POST_LANGUAGE,
  LANGUAGE_PATH_PUT_LANGUAGE,
} from "../router/server";

export class LanguageService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getAllLanguage(): Promise<ILanguageModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_LANGUAGE_GETALL,
        fetchPolicy: "no-cache",
        variables: {},
      })) as {
        data: { [LANGUAGE_PATH_GET_ALL_LANGUAGE]: ILanguageModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[LANGUAGE_PATH_GET_ALL_LANGUAGE];
      }

      return [];
    } catch (error) {
      console.log("LanguageService getAllLanguage error: ", error);
      return [];
    }
  }

  async postLanguage(lang: ILanguagePostArg) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_LANGUAGE_POST,
        variables: {
          data: lang,
        },
      })) as {
        data: { [LANGUAGE_PATH_POST_LANGUAGE]: ILanguageModel };
      };
      if (response && response.data) {
        const { data } = response;
        return data[LANGUAGE_PATH_POST_LANGUAGE];
      }

      return undefined;
    } catch (error) {
      console.log("LanguageService postLanguage error: ", error);
      return undefined;
    }
  }

  async putLanguage(lang: ILanguageModel) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_LANGUAGE_PUT,
        variables: {
          data: lang,
        },
      })) as {
        data: { [LANGUAGE_PATH_PUT_LANGUAGE]: ILanguageModel };
      };
      if (response && response.data) {
        const { data } = response;
        return data[LANGUAGE_PATH_PUT_LANGUAGE];
      }

      return undefined;
    } catch (error) {
      console.log("LanguageService putLanguage error: ", error);
      return undefined;
    }
  }
}
