import { ActionTree } from 'vuex';
import { StateInterface } from 'src/store';
import { LanguageStateInterface } from './state';
import { LanguageService } from '../../services/LanguageService';
import { ServiceProvider } from '@wisegar-org/wgo-opengar-core-ui';
import {
  GetTranslationInputGql,
  ImportTranslationsInputGql,
  ItemTranslationsInputGql,
  LanguageInputGql,
  LanguageResponseGql,
  TranslationFilterInputGql,
  TranslationInputGql
} from 'src/graphql';
import { languageMutations } from '.';
import { BoolDictionary } from '../../models';

const languageService: LanguageService = ServiceProvider.GetScoped(
  LanguageService
);

export const languageActions = {
  loadAllLanguage: 'loadAllLanguage',
  createLanguage: 'createLanguage',
  modifyLanguage: 'modifyLanguage',
  loadAndSetLanguage: 'loadAndSetLanguage',
  loadTranslations: 'loadTranslations',
  getTranslation: 'getTranslation',
  setTranslation: 'setTranslation',
  exportTranslations: 'exportTranslations',
  importTranslations: 'importTranslations',
  registerTranslations: 'registerTranslations',
  loadAllRegisterTranslations: 'loadAllRegisterTranslations'
};

const actions: ActionTree<LanguageStateInterface, StateInterface> = {
  async loadAllLanguage(
    { commit, state },
    force = false
  ): Promise<LanguageResponseGql[] | null> {
    if (force || state.languages.length === 0) {
      const result = await languageService.allLanguage();
      commit(languageMutations.setLanguages, result);
      return result;
    }
    return state.languages;
  },
  async loadAndSetLanguage(
    { commit, state, dispatch },
    id: number
  ): Promise<boolean> {
    await dispatch(languageActions.loadAllLanguage, false);
    const storageLang = parseInt(localStorage.getItem('LANGUAGE') || '0');
    const idLang = id || state.language.id || storageLang;
    let filter = state.languages.find(lang =>
      idLang ? lang.enabled && lang.id === idLang : !!lang.default
    );
    if (!filter) {
      filter = state.languages.find(lang => !!lang.enabled);
    }
    if (filter && filter.id !== state.language.id) {
      commit(languageMutations.setLanguage, filter);
      await dispatch(languageActions.loadAllRegisterTranslations);
    }
    return !!filter;
  },
  async createLanguage(
    { dispatch },
    language: LanguageInputGql
  ): Promise<boolean> {
    const result = await languageService.createLanguage(language);
    if (result) {
      await dispatch(languageActions.loadAllLanguage, true);
    }
    return result;
  },
  async modifyLanguage(
    { dispatch, state },
    language: LanguageInputGql
  ): Promise<boolean> {
    const result = await languageService.modifyLanguage(language);
    if (result) {
      await dispatch(languageActions.loadAllLanguage, true);
      await dispatch(languageActions.loadAndSetLanguage);
    }
    return result;
  },
  async loadTranslations({}, arg: TranslationFilterInputGql) {
    const result = await languageService.loadTranslations(arg);
    return result;
  },
  async getTranslation({}, arg: GetTranslationInputGql) {
    const result = await languageService.getTranslation(arg);
    return result;
  },
  async setTranslation({ commit, state }, arg: TranslationInputGql) {
    const result = await languageService.setTranslation(arg);
    if (result && state.language.id === arg.languageId) {
      commit(languageMutations.addTranslations, { [arg.key]: arg.value });
    }
    return result;
  },
  async exportTranslations({}) {
    const result = await languageService.exportTranslations();
    return result;
  },
  async importTranslations({ dispatch }, arg: ImportTranslationsInputGql) {
    const result = await languageService.importTranslations(arg);
    if (result) {
      await dispatch(languageActions.loadAllRegisterTranslations);
    }
    return result;
  },
  async registerTranslations({ dispatch, commit, state }, arg: BoolDictionary) {
    const toRegister = languageService.getNonRegisterProps(
      state.keysTranslations,
      arg
    );
    commit(languageMutations.addKeysTranslations, toRegister);
    if (!state.language.id) {
      await dispatch(languageActions.loadAndSetLanguage, 0);
    }
    if (
      state.language &&
      state.language.id &&
      Object.keys(toRegister).length > 0
    ) {
      const result = await languageService.getListTranslations(
        state.language.id,
        arg
      );
      if (result && result.items && result.items.length) {
        const translations: { [key: string]: string } = {};
        result.items.forEach(item => {
          translations[item.key] = item.value;
        });
        commit(languageMutations.addTranslations, translations);
        return true;
      }
    }
    return false;
  },
  async loadAllRegisterTranslations({ state, commit, dispatch }) {
    if (!state.language.id) {
      await dispatch(languageActions.loadAndSetLanguage, 0);
    }
    if (!!state.language && state.language.id) {
      const result = await languageService.getListTranslations(
        state.language.id,
        state.keysTranslations
      );
      if (result && result.items && result.items.length) {
        const translations: { [key: string]: string } = {};
        result.items.forEach(item => {
          translations[item.key] = item.value;
        });
        commit(languageMutations.setTranslations, translations);
        return true;
      }
    }
    return false;
  }
};

export default actions;
