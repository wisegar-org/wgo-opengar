import { defineComponent } from 'vue';
import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from 'src/wgo-base/core/components/BaseComponents';
import { TranslationStore } from 'src/wgo-base/translation/models/TranslationStore';
import { translationsServicesContent, translationsIndexContent } from '../../../models/translations';
import { translations as transBase, NumberDictionary, IMediaModel } from '../../../wgo-base/core/models';
import Loader from '../../../wgo-base/core/components/Loader/Loader.vue';
import { TranslationInput } from 'src/wgo-base/translation/resolvers/TranslationInputs';
import { useLanguageStore } from 'src/stores/languageStore';
import { CasinaModelsService } from 'src/services/CasinaModelsService';
import { useNotifyStore } from 'src/stores/notifyStore';
import { TranslationResponse } from 'src/wgo-base/translation/resolvers/TranslationResponses';
import TranslationComponent from '../../../wgo-base/translation/components/TranslationComponent/TranslationComponent.vue';
import { ApiSettingsConfig } from 'src/api/ApiOptions';
import { StorageService } from 'src/wgo-base/storage/services/StorageService';
import { CasinaDoctorType } from 'src/models/contansts';
import { StorageServiceItem, StorageServiceItemContent } from 'src/models/StorageModels';

export default defineComponent({
  name: 'ServicesContent',
  components: {
    Loader,
    TranslationComponent,
  },
  data() {
    const traslationValue: NumberDictionary = {};
    const innerLoading = false;
    const loading = false;
    const search = '';
    const doctors: StorageServiceItem[] = [];

    return {
      search,
      doctors,
      traslationValue,
      innerLoading,
      loading,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const langStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    const { getLabel } = new BaseTranslateComponent();
    const urlApi = ApiSettingsConfig.API_BASE;

    const transContent: TranslationResponse = <TranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_SERVICES_TEXT,
      id: translationsIndexContent.CASINA_INDEX_SERVICES_TEXT,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_SERVICES_TEXT
      ),
    };
    const storageService = new StorageService();

    return {
      urlApi,
      tranStore: tranStore.translationStore as TranslationStore,
      langStore: langStore.languageStore,
      translations: translationsServicesContent,
      transBase,
      notifyStore,
      transContent,
      storageService,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    onChangeServicesContent(langId: number, value: string) {
      this.traslationValue[langId] = value;
    },
    getTranslationItem(traslationValue: NumberDictionary, key: string) {
      return Object.keys(traslationValue).map((langId) => {
        const lang = parseInt(langId);
        return {
          languageId: lang,
          key: key,
          value: traslationValue[lang],
        };
      });
    },
    async saveData() {
      this.loading = true;
      let translationsToSet: TranslationInput[] = [];
      translationsToSet = translationsToSet.concat(
        this.getTranslationItem(this.traslationValue, translationsIndexContent.CASINA_INDEX_SERVICES_TEXT)
      );
      const arg = {
        imageId: 0,
        translations: translationsToSet,
      };

      const casinaModelsService = new CasinaModelsService();

      if (await casinaModelsService.setCasinaIndexContent(arg)) {
        await this.tranStore.loadAllTranslation();
        this.notifyStore.setNotify({
          message: this.getLabel(translationsIndexContent.CASINA_INDEX_CONTENT_SUCCESS_EDIT),
          position: 'top',
          type: 'positive',
        });
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(translationsIndexContent.CASINA_INDEX_CONTENT_FAIL_EDIT),
          position: 'top',
          type: 'negative',
        });
      }

      this.loading = false;
    },
    showLoading(loading: boolean) {
      this.loading = loading;
    },
    async loadServicesContent() {
      const doctors = await this.storageService.getStorageByType({
        lang: this.langStore.selectedLang.id,
        type: CasinaDoctorType,
        urlApi: ApiSettingsConfig.API_BASE,
        search: this.search,
        loadTranslations: false,
      });

      this.doctors = doctors.map(
        (item) =>
          <StorageServiceItem>{
            id: item.id,
            type: item.type,
            content: JSON.parse(item.content) as StorageServiceItemContent,
          }
      );
    },
  },
  async mounted() {
    await this.loadServicesContent();
  },
});
