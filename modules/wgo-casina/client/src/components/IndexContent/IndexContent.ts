import {
  StorageDoctorItem,
  StorageDoctorItemContent,
  StorageServiceItem,
  StorageServiceItemContent,
} from 'src/models/StorageModels';
import { useLanguageStore } from 'src/stores/languageStore';
import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from 'src/wgo-base/core/components/BaseComponents';
import { defineComponent } from 'vue';
import MediaDiv from '../../wgo-base/core/components/MediaDiv/MediaDiv.vue';
import SimpleCard from '../../wgo-base/core/components/Cards/SimpleCard.vue';
import ProfileCard from '../../wgo-base/core/components/Cards/ProfileCard.vue';
import HorizontalProfileCard from '../../wgo-base/core/components/Cards/HorizontalProfileCard.vue';
import { translationsIndexContent } from '../../models/translations';
import { IndexContentModel } from 'src/models/IndexContentModels';
import { CasinaModelsService } from 'src/services/CasinaModelsService';
import { StorageService } from '../../wgo-base/storage/services/StorageService';
import { CasinaDoctorType, CasinaServiceType } from 'src/models/contansts';
import { ApiSettingsConfig } from 'src/api/ApiOptions';

export default defineComponent({
  name: 'IndexContent',
  components: {
    MediaDiv,
    SimpleCard,
    ProfileCard,
    HorizontalProfileCard,
  },
  data() {
    const innerLoading = false;
    const doctors: StorageDoctorItem[] = [];
    const services: StorageServiceItem[] = [];
    const loading = false;
    const indexContent: IndexContentModel = <IndexContentModel>{};

    return {
      doctors,
      services,
      loading,
      innerLoading,
      indexContent,
    };
  },
  setup() {
    const langStore = useLanguageStore();
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();

    return {
      langStore: langStore.languageStore,
      tranStore: tranStore.translationStore,
      translations: translationsIndexContent,
      getLabel: (name: string) => getLabel(tranStore.translationStore as any, name),
    };
  },
  methods: {
    async loadIndexContent() {
      const indexContentService = new CasinaModelsService();
      const indexContent = await indexContentService.loadCasinaIndexContent();
      if (indexContent) {
        this.indexContent = indexContent;
      }
    },
    async loadDoctors() {
      const storageService = new StorageService();
      const result = await storageService.getStorageByType({
        lang: this.langStore.selectedLang.id,
        type: CasinaDoctorType,
        urlApi: ApiSettingsConfig.API_BASE,
      });
      const doctors = result.map(
        (item) =>
          <StorageDoctorItem>{
            id: item.id,
            type: item.type,
            image: item.image,
            content: JSON.parse(item.content) as StorageDoctorItemContent,
          }
      );
      this.doctors = doctors;
    },
    async loadServices() {
      const storageService = new StorageService();
      const result = await storageService.getStorageByType({
        lang: this.langStore.selectedLang.id,
        type: CasinaServiceType,
        urlApi: ApiSettingsConfig.API_BASE,
      });
      const services = result.map(
        (item) =>
          <StorageServiceItem>{
            id: item.id,
            type: item.type,
            content: JSON.parse(item.content) as StorageServiceItemContent,
          }
      );
      this.services = services;
    },
    async loadDataCards() {
      await this.loadIndexContent();
      await this.loadDoctors();
      await this.loadServices();
    },
  },
  async created() {
    await this.loadDataCards();
  },
});
