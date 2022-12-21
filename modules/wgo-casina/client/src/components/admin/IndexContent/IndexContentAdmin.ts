import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { defineComponent } from 'vue';
import { translationsIndexContent } from '../../../models/translations';
import { translations as transBase, NumberDictionary, IMediaModel } from '@wisegar-org/wgo-base-models/build/core';
import Loader from '@wisegar-org/wgo-base-client/build/core/components/Loader/Loader.vue';
import { ITranslationInput } from '@wisegar-org/wgo-base-models/build/translation';
import { useLanguageStore } from 'src/stores/languageStore';
import { CasinaModelsService } from 'src/services/CasinaModelsService';
import { useNotifyStore } from 'src/stores/notifyStore';
import { ITranslationResponse } from '@wisegar-org/wgo-base-models/build/translation';
import UploadImageDiv from '@wisegar-org/wgo-base-client/build/storage/components/UploadImageDiv/UploadImageDiv.vue';
import TranslationComponent from '@wisegar-org/wgo-base-client/build/translation/components/TranslationComponent/TranslationComponent.vue';
import { ApiSettingsConfig } from 'src/api/ApiOptions';
import { IndexContentModel } from 'src/models/IndexContentModels';
import { MediaService } from '@wisegar-org/wgo-base-client/build/storage/services/MediaService';

export default defineComponent({
  name: 'IndexContentAdmin',
  components: {
    Loader,
    UploadImageDiv,
    TranslationComponent,
  },
  data() {
    const traslationValue: NumberDictionary = {};
    const traslationTitleValue: NumberDictionary = {};

    const innerLoading = false;
    const loading = false;
    const imgIndex: IMediaModel = {} as IMediaModel;
    const indexContent: IndexContentModel = {} as IndexContentModel;

    return {
      traslationValue,
      traslationTitleValue,
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

    const transContent: ITranslationResponse = <ITranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_CONTENT_TEXT,
      id: translationsIndexContent.CASINA_INDEX_CONTENT_TEXT,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_CONTENT_TEXT
      ),
    };

    const transTitle: ITranslationResponse = <ITranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_CONTENT_TEXT_TITLE,
      id: translationsIndexContent.CASINA_INDEX_CONTENT_TEXT_TITLE,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_CONTENT_TEXT_TITLE
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
      transTitle,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    onChangeIndexContent(langId: number, value: string) {
      this.traslationValue[langId] = value;
    },
    onChangeIndexTitleContent(langId: number, value: string) {
      this.traslationTitleValue[langId] = value;
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
      let translationsToSet: ITranslationInput[] = [];
      translationsToSet = translationsToSet
        .concat(this.getTranslationItem(this.traslationValue, this.translations.CASINA_INDEX_CONTENT_TEXT))
        .concat(this.getTranslationItem(this.traslationTitleValue, this.translations.CASINA_INDEX_CONTENT_TEXT_TITLE));

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
