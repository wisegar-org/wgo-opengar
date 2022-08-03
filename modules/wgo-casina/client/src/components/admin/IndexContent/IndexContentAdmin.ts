import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from 'src/wgo-base/core/components/BaseComponents';
import { TranslationStore } from 'src/wgo-base/translation/models/TranslationStore';
import { defineComponent } from 'vue';
import { translationsIndexContent } from '../../../models/translations';
import { translations as transBase, NumberDictionary, IMediaModel } from '../../../wgo-base/core/models';
import Loader from '../../../wgo-base/core/components/Loader/Loader.vue';
import { TranslationInput } from 'src/wgo-base/translation/resolvers/TranslationInputs';
import { useLanguageStore } from 'src/stores/languageStore';
import { CasinaModelsService } from 'src/services/CasinaModelsService';
import { TranslationService } from 'src/wgo-base/translation/service/TranslationService';
import { useNotifyStore } from 'src/stores/notifyStore';
import { TranslationResponse } from 'src/wgo-base/translation/resolvers/TranslationResponses';
import UploadImageDiv from '../../../wgo-base/storage/components/UploadImageDiv/UploadImageDiv.vue';
import TranslationComponent from '../../../wgo-base/translation/components/TranslationComponent/TranslationComponent.vue';
import { ApiSettingsConfig } from 'src/api/ApiOptions';
import { IndexContentModel } from 'src/models/IndexContentModels';
import { MediaService } from 'src/wgo-base/storage/services/MediaService';

export default defineComponent({
  name: 'IndexContentAdmin',
  components: {
    Loader,
    UploadImageDiv,
    TranslationComponent,
  },
  data() {
    const traslationValue: NumberDictionary = {};

    const innerLoading = false;
    const loading = false;
    const imgIndex: IMediaModel = {} as IMediaModel;
    const indexContent: IndexContentModel = {} as IndexContentModel;

    return {
      traslationValue,
      innerLoading,
      loading,
      imgIndex,
      indexContent,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const langStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    const { getLabel } = new BaseTranslateComponent();
    const urlApi = ApiSettingsConfig.API_BASE;

    const transContent: TranslationResponse = <TranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_CONTENT_TEXT,
      id: translationsIndexContent.CASINA_INDEX_CONTENT_TEXT,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_CONTENT_TEXT
      ),
    };

    return {
      urlApi,
      tranStore: tranStore.translationStore as TranslationStore,
      langStore: langStore.languageStore,
      translations: translationsIndexContent,
      transBase,
      notifyStore,
      transContent,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    onChangeIndexContent(langId: number, value: string) {
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
        this.getTranslationItem(this.traslationValue, this.translations.CASINA_INDEX_CONTENT_TEXT)
      );

      const arg = {
        imageId: this.imgIndex ? this.imgIndex.id : 0,
        translations: translationsToSet,
      };

      const casinaModelsService = new CasinaModelsService();

      if (await casinaModelsService.setCasinaIndexContent(arg)) {
        const translations: { [key: string]: string } = {};
        if (this.langStore.selectedLang.id in this.traslationValue) {
          translations[this.translations.CASINA_INDEX_CONTENT_TEXT] =
            this.traslationValue[this.langStore.selectedLang.id];
        }
        if (this.indexContent.image && this.indexContent.image.id !== this.imgIndex.id) {
          const mediaService = new MediaService();
          await mediaService.deleteFile(this.indexContent.image.id);
        }
        await this.tranStore.loadAllTranslation();
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.CASINA_INDEX_CONTENT_SUCCESS_EDIT),
          position: 'top',
          type: 'positive',
        });
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.CASINA_INDEX_CONTENT_FAIL_EDIT),
          position: 'top',
          type: 'negative',
        });
      }

      this.loading = false;
    },
    async onSavedImg(media: IMediaModel) {
      if (this.imgIndex.id !== this.indexContent.image?.id) {
        const mediaService = new MediaService();
        await mediaService.deleteFile(this.imgIndex.id);
      }
      this.imgIndex = media;
    },
    showLoading(loading: boolean) {
      this.loading = loading;
    },
    async loadIndexContent() {
      const indexContentService = new CasinaModelsService();
      const indexContent = await indexContentService.loadCasinaIndexContent();
      if (indexContent) {
        this.indexContent = indexContent;
        this.imgIndex = { ...indexContent.image };
      }
    },
  },
  async mounted() {
    await this.loadIndexContent();
  },
});
