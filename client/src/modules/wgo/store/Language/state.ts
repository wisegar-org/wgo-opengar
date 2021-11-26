import { LanguageResponseGql } from 'src/graphql';
import { BoolDictionary } from '../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LanguageStateInterface {
  languages: LanguageResponseGql[];
  language: LanguageResponseGql;
  translations: { [key: string]: string };
  keysTranslations: BoolDictionary;
}

const state = (): LanguageStateInterface => {
  return {
    languages: [],
    language: <LanguageResponseGql>{},
    translations: {},
    keysTranslations: {}
  };
};

export default state;
