import { ILanguageModel, ILanguagePostArg } from ".";
import { LanguageService } from "../service/LanguageService";

export class LanguageStore {
  allLangs: ILanguageModel[];
  selectedLang: ILanguageModel;
  defaultLang: ILanguageModel;

  /**
   *
   */
  constructor() {
    this.allLangs = [];
    this.selectedLang = {} as ILanguageModel;
    this.defaultLang = {} as ILanguageModel;
  }

  async loadAllLanguage() {
    const languageService = new LanguageService();
    const languages = await languageService.getAllLanguage();
    if (languages.length > 0) {
      const languageDefaults = languages.filter((lang) => lang.default);
      const langDefault =
        languageDefaults.length > 0 ? languageDefaults[0] : languages[0];
      const selected =
        this.selectedLang &&
        languages.findIndex((item) => item.code === this.selectedLang.code) !==
          -1
          ? this.selectedLang
          : langDefault;
      this.selectedLang = selected;
      this.defaultLang = langDefault;
      this.allLangs = languages;
    } else {
      this.allLangs = [];
      this.selectedLang = {} as ILanguageModel;
      this.defaultLang = {} as ILanguageModel;
    }
  }

  async addLanguage(lang: ILanguagePostArg) {
    const languageService = new LanguageService();
    const langResult = await languageService.postLanguage(lang);
    if (!!langResult) {
      await this.loadAllLanguage();
    }

    return !!langResult;
  }

  async editLanguage(lang: ILanguageModel) {
    const languageService = new LanguageService();
    const langResult = await languageService.putLanguage(lang);
    if (!!langResult) {
      await this.loadAllLanguage();
    }

    return !!langResult;
  }

  allLanguage() {
    return this.allLangs.filter((lang) => lang.enabled);
  }
}
