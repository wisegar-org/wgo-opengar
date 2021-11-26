import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { ApiSettings } from 'src/boot/settings';
import {
  GetTranslationInputGql,
  LanguageInputGql,
  LanguageResponseGql,
  TranslationExportResponseGql,
  TranslationFilterInputGql,
  TranslationFilterPageResponseGql,
  TranslationInputGql,
  ImportTranslationsInputGql,
  GetListTranslationsInputGql,
  GetListTranslationsResponseGql,
  ItemTranslationsInputGql
} from 'src/graphql';
import {
  M_LANGUAGE_CREATE,
  M_LANGUAGE_MODIFY,
  M_TRANSLATION_IMPORTTRANSLATIONS,
  M_TRANSLATION_SETTRANSLATION,
  Q_LANGUAGE_ALL,
  Q_TRANSLATION_EXPORTTRANSLATIONS,
  Q_TRANSLATION_GETFILTERTRANSLATIONS,
  Q_TRANSLATION_GETLISTTRANSLATIONS,
  Q_TRANSLATION_GETTRANSLATION
} from '../graphql/language';
import { BoolDictionary } from '../models';

export class LanguageService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  async allLanguage(): Promise<LanguageResponseGql[]> {
    try {
      const response = (await this.apiService.query({
        query: Q_LANGUAGE_ALL,
        variables: {
          urlApi: ApiSettings.API_STATIC_BASE
        },
        fetchPolicy: 'no-cache',
        context: {
          hasUpload: true
        }
      })) as { data: { allLanguage: LanguageResponseGql[] } };

      if (response.data && response.data.allLanguage) {
        const {
          data: { allLanguage }
        } = response;
        return allLanguage;
      }
      return [];
    } catch (error) {
      throw `LanguageService allLanguage: ${error as string}`;
    }
  }

  async createLanguage(record: LanguageInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_LANGUAGE_CREATE,
        variables: {
          data: record
        },
        fetchPolicy: 'no-cache',
        context: {
          hasUpload: true
        }
      })) as { data: { createLanguage: unknown } };

      if (response.data && response.data.createLanguage) {
        const {
          data: { createLanguage }
        } = response;
        return !!createLanguage;
      }
      return false;
    } catch (error) {
      throw `LanguageService createLanguage: ${error as string}`;
    }
  }

  async modifyLanguage(record: LanguageInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_LANGUAGE_MODIFY,
        variables: {
          data: record
        },
        fetchPolicy: 'no-cache',
        context: {
          hasUpload: true
        }
      })) as { data: { modifyLanguage: unknown } };

      if (response.data && response.data.modifyLanguage) {
        const {
          data: { modifyLanguage }
        } = response;
        return !!modifyLanguage;
      }
      return false;
    } catch (error) {
      throw `LanguageService modifyLanguage: ${error as string}`;
    }
  }
  async loadTranslations(
    arg: TranslationFilterInputGql
  ): Promise<TranslationFilterPageResponseGql> {
    try {
      const response = (await this.apiService.query({
        query: Q_TRANSLATION_GETFILTERTRANSLATIONS,
        variables: {
          data: arg
        },
        fetchPolicy: 'no-cache'
      })) as {
        data: { getTranslationByFilter: TranslationFilterPageResponseGql };
      };

      if (response.data && response.data.getTranslationByFilter) {
        const {
          data: { getTranslationByFilter }
        } = response;
        return getTranslationByFilter;
      }
      return <TranslationFilterPageResponseGql>{
        translationsCount: 0,
        translations: []
      };
    } catch (error) {
      throw `LanguageService loadTranslations: ${error as string}`;
    }
  }

  async getTranslation(arg: GetTranslationInputGql): Promise<string> {
    try {
      const response = (await this.apiService.query({
        query: Q_TRANSLATION_GETTRANSLATION,
        variables: {
          data: arg
        },
        fetchPolicy: 'no-cache'
      })) as {
        data: { getTranslation: string };
      };

      if (response.data && response.data.getTranslation) {
        const {
          data: { getTranslation }
        } = response;
        return getTranslation;
      }
      return arg.key;
    } catch (error) {
      throw `LanguageService getTranslation: ${error as string}`;
    }
  }

  async setTranslation(arg: TranslationInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_TRANSLATION_SETTRANSLATION,
        variables: {
          data: arg
        },
        fetchPolicy: 'no-cache'
      })) as {
        data: { setTranslation: boolean };
      };

      if (response.data && response.data.setTranslation) {
        const {
          data: { setTranslation }
        } = response;
        return setTranslation;
      }
      return false;
    } catch (error) {
      throw `LanguageService setTranslation: ${error as string}`;
    }
  }

  async exportTranslations(): Promise<TranslationExportResponseGql> {
    try {
      const response = (await this.apiService.query({
        query: Q_TRANSLATION_EXPORTTRANSLATIONS,
        variables: {},
        fetchPolicy: 'no-cache'
      })) as {
        data: { exportTranslations: TranslationExportResponseGql };
      };

      if (response.data && response.data.exportTranslations) {
        const {
          data: { exportTranslations }
        } = response;
        return exportTranslations;
      }
      return <TranslationExportResponseGql>{ isSuccess: false };
    } catch (error) {
      throw `LanguageService exportTranslations: ${error as string}`;
    }
  }

  async importTranslations(arg: ImportTranslationsInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_TRANSLATION_IMPORTTRANSLATIONS,
        variables: {
          data: arg
        },
        fetchPolicy: 'no-cache',
        context: {
          hasUpload: true
        }
      })) as {
        data: { importTranslations: boolean };
      };

      if (response.data && response.data.importTranslations) {
        const {
          data: { importTranslations }
        } = response;
        return importTranslations;
      }
      return false;
    } catch (error) {
      throw `LanguageService importTranslations: ${error as string}`;
    }
  }

  async getListTranslations(
    languageId: number,
    items: BoolDictionary
  ): Promise<GetListTranslationsResponseGql> {
    try {
      const translations = Object.keys(items).map(
        itemKey =>
          <ItemTranslationsInputGql>{ key: itemKey, trim: items[itemKey] }
      );
      const response = (await this.apiService.query({
        query: Q_TRANSLATION_GETLISTTRANSLATIONS,
        variables: {
          data: <GetListTranslationsInputGql>{
            languageId: languageId,
            items: translations
          }
        },
        fetchPolicy: 'no-cache'
      })) as {
        data: { getTranslationsContent: GetListTranslationsResponseGql };
      };

      if (response.data && response.data.getTranslationsContent) {
        const {
          data: { getTranslationsContent }
        } = response;
        return getTranslationsContent;
      }
      return <GetListTranslationsResponseGql>{ items: [] };
    } catch (error) {
      throw `LanguageService getListTranslations: ${error as string}`;
    }
  }

  getNonRegisterProps(registered: BoolDictionary, toRegister: BoolDictionary) {
    const result: BoolDictionary = {};
    Object.keys(toRegister).forEach(nameProp => {
      if (
        !(nameProp in registered) ||
        registered[nameProp] !== toRegister[nameProp]
      ) {
        result[nameProp] = toRegister[nameProp];
      }
    });
    return result;
  }
}
