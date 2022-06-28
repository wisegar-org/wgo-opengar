import { ApiService } from '../../../../wgo-base/core/services/ApiService';
import { boot } from 'quasar/wrappers';
import { getApiServiceOptions } from 'src/api/ApiOptions';
import { useAuthStore } from 'src/stores/authStore';
import { useLanguageStore } from 'src/stores/languageStore';

export default boot(({ app, store, router }) => {
  if (!ApiService.isDefineInstance()) {
    const apiServiceOptions = getApiServiceOptions(store);
    ApiService.GetInstance(apiServiceOptions);
  }
  //init store values
  const promises: Promise<any>[] = [];

  //Language store
  const langStore = useLanguageStore(store);
  app.config.globalProperties.$langStore = langStore;
  promises.push(langStore.loadAllLanguages());

  //Authentication store
  const authStore = useAuthStore(store);
  app.config.globalProperties.$authStore = authStore;
  promises.push(authStore.authStore.me());

  return Promise.all(promises).then(() => {});
});
