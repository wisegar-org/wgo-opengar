import { ApiService } from "@wisegar-org/wgo-base-client/build/core/services/ApiService";
import { boot } from "quasar/wrappers";
import { getApiServiceOptions } from "src/api/ApiOptions";
import { useAuthStore } from "src/stores/authStore";
import { useLanguageStore } from "src/stores/languageStore";
import { useTranslationStore } from "src/stores/translationStore";
// import { Translations } from "../settings/translations";
// import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { LocalStorageService } from "@wisegar-org/wgo-base-client/build/core/services/LocalStorageService";
import { LocalStorage } from "@wisegar-org/wgo-base-client/build/core/services/LocalStorage";
import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";

export default boot(({ app, store }) => {
  if (!ApiService.isDefineInstance()) {
    const apiServiceOptions = getApiServiceOptions(store);
    ApiService.GetInstance(apiServiceOptions);
  }

  //init store values
  const promises: Promise<boolean>[] = [];

  //Authentication store
  const authStore = useAuthStore(store);
  app.config.globalProperties.$authStore = authStore;

  //Translation store
  const translationStore = useTranslationStore();
  app.config.globalProperties.$translationStore = translationStore;

  //Language store
  const langStore = useLanguageStore(store);
  // langStore.setTranslationStore(
  //   translationStore.translationStore as TranslationStore
  // );
  app.config.globalProperties.$langStore = langStore;

  const localStorageService = new LocalStorageService();

  promises.push(
    localStorageService.getLocalStore().then((json: ObjectDictionary) => {
      Object.keys(json).forEach((key) => LocalStorage.setItem(key, json[key]));
      return authStore.authStore.me();
    })
  );

  // promises.push(
  //   //First do me request to validate token
  //   authStore.authStore.me().then(() => {
  //     //register others request on stores workflow

  //     return langStore
  //       .loadAllLanguages()
  //       .then(() => translationStore.getAndRegisterTranslations(Translations));
  //   })
  // );

  return Promise.all(promises).then(() => {
    console.log("All boots ready");
  });
});
