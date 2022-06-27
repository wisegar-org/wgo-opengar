import { defineStore } from 'pinia';
import { ILanguageModel } from '../../../../wgo-base/language/models';
import { LanguageStore } from '../../../../wgo-base/language/models/LanguageStore';

export const languageStoreId = 'languageStore';

export const useLanguageStore = defineStore({
  id: languageStoreId,
  state: () => ({
    languageStore: new LanguageStore(),
  }),
  getters: {},
  actions: {
    async loadAllLanguages() {
      await this.languageStore.loadAllLanguage();
    },
    getLanguageStore() {
      return this.languageStore;
    },
  },
});
