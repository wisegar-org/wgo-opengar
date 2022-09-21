import { defineComponent } from "vue";
import MediaDiv from "../../wgo-base/core/components/MediaDiv/MediaDiv.vue";
import ModuleCard from "../../wgo-base/core/components/Cards/ModuleCard.vue";
import { IIndexContentModel } from "../../../../src/models/IndexContent";
import { IndexContentService } from "src/services/IndexContent/IndexContentService";
import { useTranslationStore } from "src/stores/translationStore";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import ContactComponent from "../../wgo-base/contact/components/ContactComponent/ContactComponent.vue";
import MapComponent from "../../wgo-base/contact/components/MapComponent/MapComponent.vue";
import { StorageItem } from "../../wgo-base/storage/models/StorageModel";
import { StorageIndexContentModules } from "src/models/indexContent";
import { StorageService } from "../../wgo-base/storage/services/StorageService";
import { useAuthStore } from "src/stores/authStore";
import { AuthStore } from "src/wgo-base/authentication/models/AuthStore";
import { useLanguageStore } from "src/stores/languageStore";
import { LanguageStore } from "src/wgo-base/language/models/LanguageStore";
import { ApiSettingsConfig } from "src/api/ApiOptions";
import {
  MODULES_STORAGE_TYPE,
  translationsIndexContent as translations,
} from "../../models";
import { BaseTranslateComponent } from "src/wgo-base/core/components/BaseComponents";

export default defineComponent({
  name: "IndexContent",
  components: {
    MediaDiv,
    ContactComponent,
    MapComponent,
    ModuleCard,
  },
  data() {
    const indexContent: IIndexContentModel = {} as IIndexContentModel;
    const modules: StorageItem<StorageIndexContentModules>[] = [];
    return {
      indexContent,
      modules,
      translations,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const authStore = useAuthStore();
    const langStore = useLanguageStore();

    const { getLabel } = new BaseTranslateComponent();
    return {
      langStore: langStore.languageStore as LanguageStore,
      authStore: authStore.authStore as AuthStore,
      tranStore: tranStore.translationStore as TranslationStore,
      getLabel: (name: string) =>
        getLabel(tranStore.translationStore as any, name),
    };
  },
  async created() {
    const indexService = new IndexContentService();
    const indexContent = await indexService.loadIndexContent();
    if (indexContent) {
      this.indexContent = indexContent;
    }
    const storageService = new StorageService();
    const modules = await storageService.getStorageByType({
      lang: this.langStore.defaultLang.id || 0,
      type: MODULES_STORAGE_TYPE,
      urlApi: ApiSettingsConfig.API_BASE,
      loadTranslations: true,
    });
    if (modules) {
      this.modules = modules.map((item) => ({
        id: item.id,
        type: item.type,
        image: item.image,
        content: JSON.parse(item.content) as StorageIndexContentModules,
      })) as any[] as StorageItem<StorageIndexContentModules>[];
    }
  },
});
