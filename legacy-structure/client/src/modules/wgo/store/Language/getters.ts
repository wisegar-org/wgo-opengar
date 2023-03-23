import { GetterTree } from 'vuex';
import { StateInterface } from 'src/store';
import { LanguageStateInterface } from './state';

export const languageGetters = {
  getLanguages: 'getLanguages',
  getLanguage: 'getLanguage',
  getEnabledLanguages: 'getEnabledLanguages',
  getTranslations: 'getTranslations',
  getKeysTranslations: 'getKeysTranslations'
};

const getters: GetterTree<LanguageStateInterface, StateInterface> = {
  getLanguages(state) {
    return state.languages;
  },
  getLanguage(state) {
    return state.language;
  },
  getEnabledLanguages(state) {
    return state.languages.filter(lang => lang.enabled);
  },
  getTranslations(state) {
    return state.translations;
  },
  getKeysTranslations(state) {
    return state.keysTranslations;
  }
};

export default getters;
