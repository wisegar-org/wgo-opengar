import { defineStore } from 'pinia';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';

export const translationStoreId = 'translationStore';

export const useTranslationStore = defineStore({
  id: translationStoreId,
  state: () => ({
    translationStore: new TranslationStore(),
  }),
  getters: {},
  actions: {
    async loadAllTranslations(langId: number) {
      await this.translationStore.setLanguageId(langId);
    },
    getTranslationStore() {
      return this.translationStore;
    },
    async getAndRegisterTranslations(keys: string[]) {
      return await this.translationStore.loadAllTranslationByKeys(keys);
    },
  },
});
