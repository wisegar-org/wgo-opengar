import { ItemTranslationsInputGql, LanguageResponseGql } from 'src/graphql';
import { MutationTree } from 'vuex';
import { BoolDictionary } from '../../models';
import { LanguageStateInterface } from './state';

export const languageMutations = {
  setLanguages: 'setLanguages',
  setLanguage: 'setLanguage',
  setTranslations: 'setTranslations',
  addTranslations: 'addTranslations',
  addKeysTranslations: 'addKeysTranslations'
};

export const mutations: MutationTree<LanguageStateInterface> = {
  setLanguages(state, languages: LanguageResponseGql[]) {
    state.languages = languages;
  },
  setLanguage(state, language: LanguageResponseGql) {
    state.language = language;
    localStorage.setItem('LANGUAGE', `${language.id}`);
  },
  setTranslations(state, translations: { [key: string]: string }) {
    state.translations = translations;
  },
  addTranslations(state, translations: { [key: string]: string }) {
    state.translations = { ...state.translations, ...translations };
  },
  addKeysTranslations(state, keysTranslations: BoolDictionary) {
    state.keysTranslations = { ...state.keysTranslations, ...keysTranslations };
  }
};
