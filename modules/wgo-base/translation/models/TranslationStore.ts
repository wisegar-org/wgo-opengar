import {
  IExportTranslationsArg,
  ISetTranslationArg,
  ITranslationListModel,
  ITranslationModel,
} from ".";
import { TranslationService } from "../service/TranslationService";

export class TranslationStore {
  translations: ITranslationListModel<ITranslationModel>;
  translationsValue: ITranslationListModel<string>;
  languageId: number;

  constructor() {
    this.translations = {} as ITranslationListModel<ITranslationModel>;
    this.translationsValue = {} as ITranslationListModel<string>;
    this.languageId = 0;
  }

  async loadAllTranslation() {
    const translationService = new TranslationService();
    const translations = await translationService.getAllTranslation({
      languageId: this.languageId,
    });
    this.updateObject(translations);
  }

  async getAllTranslationByLanguage(langId: number) {
    const translationService = new TranslationService();
    const translations = await translationService.getAllTranslation({
      languageId: langId,
    });
    return translations;
  }

  async loadAllTranslationByKeys(keys: string[]) {
    const translationService = new TranslationService();
    const translations = await translationService.getAllTranslationByKey({
      languageId: this.languageId,
      keys,
    });
    this.updateObject(translations);
  }
  async getAllTranslationByKeysAndLanguage(langId: number, keys: string[]) {
    const translationService = new TranslationService();
    const translations = await translationService.getAllTranslationByKey({
      languageId: langId,
      keys,
    });
    return translations;
  }

  getTranslation(key: string) {
    if (key in this.translations) {
      return this.translationsValue[key] || key;
    } else if (`${key}`.toUpperCase().startsWith("WGO")) {
      this.loadAllTranslationByKeys([key]);
    }

    return key;
  }

  async getTranslationByLanguage(langId: number, key: string) {
    const translations = await this.getAllTranslationByKeysAndLanguage(langId, [
      key,
    ]);
    if (translations && translations.length > 0) {
      return translations[0].value;
    }
    return key;
  }

  async setTranslation(input: ISetTranslationArg) {
    const translationService = new TranslationService();
    const translation = await translationService.setTranslation(input);
    return translation;
  }

  async setLanguageId(langId: number) {
    this.languageId = langId;
    await this.loadAllTranslation();
  }

  async importTranslations(input: any) {
    const translationService = new TranslationService();
    const result = await translationService.importTranslations(input);
    if (result) {
      await this.loadAllTranslation();
    }
    return result;
  }

  async exportTranslations(input: IExportTranslationsArg) {
    const translationService = new TranslationService();
    const result = await translationService.exportTranslations(input);
    return result;
  }

  private updateObject(translations: ITranslationModel[]) {
    translations.forEach((translation) => {
      this.translations[translation.key] = translation;
      this.translationsValue[translation.key] = translation.value;
    });
  }
}
