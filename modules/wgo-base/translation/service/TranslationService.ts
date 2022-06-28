import { ApiService } from "../../core/services/ApiService";
import {
  Q_TRANSLATION_GETALL,
  Q_TRANSLATION_GETALLBYKEYS,
  M_TRANSLATION_SETTRANSLATION,
} from "./TranslationServiceQueries";
import "../models";
import {
  TRANSLATION_PATH_GET_ALL_TRANSLATION,
  TRANSLATION_PATH_GET_ALL_BY_KEYS,
  TRANSLATION_PATH_SET_TRANSLATION,
} from "../router/server";
import {
  IGetAllTranslationArg,
  IGetAllTranslationsByKeyArg,
  ISetTranslationArg,
  ITranslationModel,
} from "../models";

export class TranslationService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getAllTranslation(
    data: IGetAllTranslationArg
  ): Promise<ITranslationModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_TRANSLATION_GETALL,
        fetchPolicy: "no-cache",
        variables: {
          data: data,
        },
      })) as {
        data: { [TRANSLATION_PATH_GET_ALL_TRANSLATION]: ITranslationModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_GET_ALL_TRANSLATION];
      }

      return [];
    } catch (error) {
      console.log("TranslationService getAllTranslation error: ", error);
      return [];
    }
  }

  async getAllTranslationByKey(
    data: IGetAllTranslationsByKeyArg
  ): Promise<ITranslationModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_TRANSLATION_GETALLBYKEYS,
        fetchPolicy: "no-cache",
        variables: {
          data: data,
        },
      })) as {
        data: { [TRANSLATION_PATH_GET_ALL_BY_KEYS]: ITranslationModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_GET_ALL_BY_KEYS];
      }

      return [];
    } catch (error) {
      console.log("TranslationService getAllTranslationByKey error: ", error);
      return [];
    }
  }

  async setTranslation(lang: ISetTranslationArg) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_TRANSLATION_SETTRANSLATION,
        variables: {
          data: lang,
        },
      })) as {
        data: { [TRANSLATION_PATH_SET_TRANSLATION]: ITranslationModel };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_SET_TRANSLATION];
      }

      return undefined;
    } catch (error) {
      console.log("TranslationService setTranslation error: ", error);
      return undefined;
    }
  }
}
