import { ApiService } from "@wisegar-org/wgo-base-client/build/core/services/ApiService";
import { boot } from "quasar/wrappers";
import { getApiServiceOptions } from "src/api/ApiOptions";
import { useAuthStore } from "src/stores/authStore";
import { useLanguageStore } from "src/stores/languageStore";
import { useTranslationStore } from "src/stores/translationStore";
import { Translations } from "../settings/translations";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";

export default boot(({ app, store, router }) => {
  if (!ApiService.isDefineInstance()) {
    const apiServiceOptions = getApiServiceOptions(store);
    ApiService.GetInstance(apiServiceOptions);
  }
  //init store values
  const promises: Promise<any>[] = [];

  //Authentication store
  const authStore = useAuthStore(store);
  app.config.globalProperties.$authStore = authStore;

  //Translation store
  const translationStore = useTranslationStore();
  app.config.globalProperties.$translationStore = translationStore;

  //Language store
  const langStore = useLanguageStore(store);
  langStore.setTranslationStore(
    translationStore.translationStore as TranslationStore
  );
  app.config.globalProperties.$langStore = langStore;

  promises.push(
    //First do me request to validate token
    authStore.authStore.me().then(() => {
      const promisesStore: Promise<any>[] = [];
      //register others request on stores workflow
      promisesStore.push(
        langStore
          .loadAllLanguages()
          .then(() => translationStore.getAndRegisterTranslations(Translations))
      );

      return Promise.all(promisesStore);
    })
  );

  return Promise.all(promises).then(() => {});
});
