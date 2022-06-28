import { ITranslationListModel, ITranslationModel } from ".";
import { LanguageStore } from "../../language/models/LanguageStore";
import { TranslationService } from "../service/TranslationService";

export class TranslationStore {
  translations: ITranslationListModel<ITranslationModel>;
  translationsValue: ITranslationListModel<string>;
  languageStore: LanguageStore;

  constructor(languageStore: LanguageStore) {
    this.translations = {} as ITranslationListModel<ITranslationModel>;
    this.translationsValue = {} as ITranslationListModel<string>;
    this.languageStore = languageStore;
  }

  async loadAllTranslation() {
    const translationService = new TranslationService();
    const translations = await translationService.getAllTranslation({
      languageId: this.languageStore.selectedLang.id,
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
      languageId: this.languageStore.selectedLang.id,
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
    } else {
      this.loadAllTranslationByKeys([key]);
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
