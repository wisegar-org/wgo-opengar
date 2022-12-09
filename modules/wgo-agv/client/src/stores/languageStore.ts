import { defineStore } from "pinia";
import { LanguageStore } from "../wgo-base/client/language/store/LanguageStore";
import { TranslationStore } from "../wgo-base/client/translation/store/TranslationStore";

export const languageStoreId = "languageStore";

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
