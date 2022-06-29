import { ITranslationListModel, ITranslationModel } from ".";
import { TranslationService } from "../service/TranslationService";

export class TranslationStore {
  translations: ITranslationListModel<ITranslationModel>;
  translationsValue: ITranslationListModel<string>;

  constructor() {
    this.translations = {} as ITranslationListModel<ITranslationModel>;
    this.translationsValue = {} as ITranslationListModel<string>;
  }

  async loadAllTranslation(langId: number) {
    const translationService = new TranslationService();
    const translations = await translationService.getAllTranslation({
      languageId: langId,
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

  async loadAllTranslationByKeys(langId: number, keys: string[]) {
    const translationService = new TranslationService();
    const translations = await translationService.getAllTranslationByKey({
      languageId: langId,
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

  getTranslation(langId: number, key: string) {
    if (key in this.translations) {
      return this.translationsValue[key] || key;
    } else {
      this.loadAllTranslationByKeys(langId, [key]);
      return key;
    }
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

  private updateObject(translations: ITranslationModel[]) {
    translations.forEach((translation) => {
      this.translations[translation.key] = translation;
      this.translationsValue[translation.key] = translation.value;
    });
  }
}
