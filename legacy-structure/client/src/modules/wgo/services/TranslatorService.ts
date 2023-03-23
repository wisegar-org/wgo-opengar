/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import enUS from 'src/i18n/en-us';
import i18n from 'src/i18n';
import VueI18n from 'vue-i18n';
import { FunctionDictionary } from '../models/models';

export class TranslatorService {
  private frameworkI18n: VueI18n;
  private constructor(frameworkI18n: VueI18n) {
    this.frameworkI18n = frameworkI18n;
  }

  private translate(key: string) {
    const translation = this.frameworkI18n.tc(key);
    return !translation || translation === '' ? key : translation;
  }
  private set(locationKey: string) {
    this.frameworkI18n.locale = locationKey;
  }
  public static GenerateLanguagesMethods() {
    const keys = Object.keys(i18n);
    keys.forEach(k => {
      const key = k.replace('-', '');
      ((TranslatorService.instance as unknown) as FunctionDictionary)[
        key
      ] = () => {
        TranslatorService.instance.set(k);
      };
    });
  }
  public static GenerateTranslationMethods() {
    const keys = Object.keys(enUS);
    keys.forEach(k => {
      ((TranslatorService.instance as unknown) as FunctionDictionary)[
        `${k}`
      ] = () => {
        return TranslatorService.instance.translate(k);
      };
    });
  }
  private static instance: TranslatorService;
  public static GetInstance(frameworkI18n?: VueI18n) {
    if (!TranslatorService.instance && frameworkI18n) {
      TranslatorService.instance = new TranslatorService(frameworkI18n);
      TranslatorService.GenerateLanguagesMethods();
      TranslatorService.GenerateTranslationMethods();
    }
    if (!TranslatorService.instance && !frameworkI18n) {
      throw Error('Frameworki18n parameter not valid');
    }
    return TranslatorService.instance;
  }
}
