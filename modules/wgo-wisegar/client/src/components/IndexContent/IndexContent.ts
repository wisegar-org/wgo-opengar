import { defineComponent } from "vue";
import MediaDiv from "@wisegar-org/wgo-base-client/build/core/components/MediaDiv/MediaDiv.vue";
import ModuleCard from "@wisegar-org/wgo-base-client/build/core/components/Cards/ModuleCard.vue";
import { IIndexContentModel } from "../../../../src/models/IndexContent";
import { IndexContentService } from "src/services/IndexContent/IndexContentService";
import { useTranslationStore } from "src/stores/translationStore";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import ContactComponent from "@wisegar-org/wgo-base-client/build/contact/components/ContactComponent/ContactComponent.vue";
import MapComponent from "@wisegar-org/wgo-base-client/build/contact/components/MapComponent/MapComponent.vue";
import { StorageIndexContentModules } from "src/models/indexContent";
import { StorageService } from "@wisegar-org/wgo-base-client/build/storage/services/StorageService";
import { useAuthStore } from "src/stores/authStore";
import { AuthStore } from "@wisegar-org/wgo-base-client/build/authentication/store/AuthStore";
import { useLanguageStore } from "src/stores/languageStore";
import { LanguageStore } from "@wisegar-org/wgo-base-client/build/language/store/LanguageStore";
import { ApiSettingsConfig } from "src/api/ApiOptions";
import {
  MODULES_STORAGE_TYPE,
  translationsIndexContent as translations,
} from "../../models";
import { BaseTranslateComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { StorageItem } from "@wisegar-org/wgo-base-models/build/storage/index";

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
