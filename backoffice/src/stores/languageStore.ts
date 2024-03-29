import { defineStore } from "pinia";
import { LanguageStore } from "@wisegar-org/wgo-base-client/build/language/store/LanguageStore";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";

export const languageStoreId = "languageStore";

export const useLanguageStore = defineStore({
  id: languageStoreId,
  state: () => ({
    languageStore: new LanguageStore(),
  }),
  getters: {},
  actions: {
    setTranslationStore(translationStore: TranslationStore) {
      if (this.languageStore.setTranslationStore)
        this.languageStore.setTranslationStore(translationStore);
      else this.languageStore.translationStore = translationStore;
    },
    async loadAllLanguages() {
      await this.languageStore.loadAllLanguage();
    },
    getLanguageStore() {
      return this.languageStore;
    },
    setLanguageStore(languageStore: LanguageStore) {
      this.languageStore = languageStore;
    },
  },
});
