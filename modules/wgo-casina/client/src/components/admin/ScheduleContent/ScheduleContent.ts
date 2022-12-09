import { defineComponent } from 'vue';
import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from 'src/wgo-base/core/components/BaseComponents';
import { TranslationStore } from 'src/wgo-base/translation/models/TranslationStore';
import { translationsScheduleContent, translationsIndexContent } from '@wisegar-org/wgo-base-models/build/translations';
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
  name: 'ScheduleContent',
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
    const translationsScheduleTitle: NumberDictionary = {};
    const translationsScheduleContent: NumberDictionary = {};

    return {
      search,
      doctors,
      traslationValue,
      innerLoading,
      loading,
      translationsScheduleTitle,
      translationsScheduleContent,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const langStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    const { getLabel } = new BaseTranslateComponent();
    const urlApi = ApiSettingsConfig.API_BASE;

    const transTitleContent: TranslationResponse = <TranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_SCHEDULE_TITLE_TEXT,
      id: translationsIndexContent.CASINA_INDEX_SCHEDULE_TITLE_TEXT,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_SCHEDULE_TITLE_TEXT
      ),
    };
    const transContent: TranslationResponse = <TranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_SCHEDULE_CONTENT_TEXT,
      id: translationsIndexContent.CASINA_INDEX_SCHEDULE_CONTENT_TEXT,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_SCHEDULE_CONTENT_TEXT
      ),
    };
    const storageService = new StorageService();

    return {
      urlApi,
      tranStore: tranStore.translationStore as TranslationStore,
      langStore: langStore.languageStore,
      translations: translationsScheduleContent,
      transBase,
      notifyStore,
      transContent,
      transTitleContent,
      storageService,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    onChangeTitle(langId: number, value: string) {
      this.onChange(this.translationsScheduleTitle, langId, value);
    },
    onChangeContent(langId: number, value: string) {
      this.onChange(this.translationsScheduleContent, langId, value);
    },
    onChange(traslationValue: NumberDictionary, langId: number, value: string) {
      traslationValue[langId] = value;
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
      translationsToSet = translationsToSet
        .concat(
          this.getTranslationItem(
            this.translationsScheduleTitle,
            translationsIndexContent.CASINA_INDEX_SCHEDULE_TITLE_TEXT
          )
        )
        .concat(
          this.getTranslationItem(
            this.translationsScheduleContent,
            translationsIndexContent.CASINA_INDEX_SCHEDULE_CONTENT_TEXT
          )
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
    async loadScheduleContent() {
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
    await this.loadScheduleContent();
  },
});
