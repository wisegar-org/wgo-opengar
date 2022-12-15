import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { defineStore } from 'pinia';
import { LanguageStore } from '@wisegar-org/wgo-base-client/build/language/store/LanguageStore';

export const languageStoreId = 'languageStore';

export const useLanguageStore = defineStore({
  id: languageStoreId,
  state: () => ({
    languageStore: new LanguageStore(),
  }),
  getters: {},
  actions: {
    setTranslationStore(translationStore: TranslationStore) {
      this.languageStore.setTranslationStore(translationStore);
    },
    async loadAllLanguages() {
      await this.languageStore.loadAllLanguage();
    },
    getLanguageStore() {
      return this.languageStore;
    },
  },
});
