import enUS from './en-us';
import en from '../assets/Languages/en.png';

export interface ILanguageItem {
  icon: string;
  onClick: () => any;
}

export interface ILanguageConfig {
  [key: string]: ILanguageItem;
}

export const LanguagesConfig: ILanguageConfig = {
  [enUS.nameLanguage]: {
    icon: en,
    onClick: () => {
      // translation.enus(); TODO
    }
  }
};

export default {
  'en-us': enUS
};
