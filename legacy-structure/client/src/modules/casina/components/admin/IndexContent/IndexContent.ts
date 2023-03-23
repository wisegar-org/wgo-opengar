import {
  languageActions,
  languageGetters,
  languageMutations,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import UploadImageDiv from '../../../../wgo/components/UploadImageDiv/UploadImageDiv.vue';
import TranslationComponent from '../../../../wgo/components/Translations/TranslationEditors/TranslationComponent.vue';
import {
  ITranslationIndexContentKeys,
  TranslationsKeys,
  TranslationIndexContentKey
} from './TranslationsKeys';
import {
  CasinaIndexContentInputsGql,
  LanguageResponseGql,
  MediaResponseGql,
  TranslationFilterResponseGql,
  TranslationInputGql
} from 'src/graphql';
import {
  casinaModelsActionsKeys,
  casinaModelsGettersKeys,
  casinaModelsNamespace
} from 'src/modules/casina/store/CasinaModels';
import { IndexContentModel } from 'src/modules/casina/models/IndexContentModels';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { INotify, NumberDictionary } from 'src/modules/wgo/models';

@Component({
  components: {
    UploadImageDiv,
    TranslationComponent
  }
})
export default class IndexContent extends Vue {
  @Action(casinaModelsActionsKeys.loadCasinaIndexContent, {
    namespace: casinaModelsNamespace
  })
  loadCasinaIndexContent!: () => Promise<void>;
  @Getter(casinaModelsGettersKeys.getIndexContent, {
    namespace: casinaModelsNamespace
  })
  indexContent!: IndexContentModel;
  @Action(casinaModelsActionsKeys.setCasinaIndexContent, {
    namespace: casinaModelsNamespace
  })
  setCasinaIndexContent!: (
    data: CasinaIndexContentInputsGql
  ) => Promise<boolean>;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationIndexContentKeys;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;
  transContent: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: TranslationIndexContentKey,
    id: TranslationIndexContentKey
  };
  @Mutation(languageMutations.addTranslations, { namespace: languageNamespace })
  addTranslations!: (obj: any) => unknown;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  traslationValue: NumberDictionary = {};

  innerLoading = true;
  loading = false;
  imgIndex: MediaResponseGql | null = null;

  onChangeIndexContent(
    translations: NumberDictionary,
    langId: number,
    value: string
  ) {
    translations[langId] = value;
  }

  onSavedImg(media: MediaResponseGql) {
    this.imgIndex = media;
  }

  getTranslationItem(traslationValue: NumberDictionary, key: string) {
    return Object.keys(traslationValue).map(langId => {
      const lang = parseInt(langId);
      return {
        languageId: lang,
        key: key,
        value: traslationValue[lang]
      };
    });
  }

  async saveData() {
    this.loading = true;
    let translationsToSet: TranslationInputGql[] = [];
    translationsToSet = translationsToSet.concat(
      this.getTranslationItem(this.traslationValue, TranslationIndexContentKey)
    );

    const arg = <CasinaIndexContentInputsGql>{
      imageId: this.imgIndex ? this.imgIndex.id : 0,
      translations: translationsToSet
    };

    if (await this.setCasinaIndexContent(arg)) {
      const translations: { [key: string]: string } = {};
      if (this.language.id in this.traslationValue) {
        translations[TranslationIndexContentKey] = this.traslationValue[
          this.language.id
        ];
      }
      this.addTranslations(translations);
      this.notify({
        message: this.translationContent.CASINA_INDEX_CONTENT_SUCCESS_EDIT,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.CASINA_INDEX_CONTENT_FAIL_EDIT,
        type: 'negative'
      });
    }

    this.loading = false;
  }

  @Watch('indexContent')
  setData() {
    this.imgIndex = this.indexContent.image ? this.indexContent.image : null;
  }

  showLoading(loading: boolean) {
    this.loading = loading;
  }

  async created() {
    await this.registerTranslations(TranslationsKeys);
    this.transContent.value = this.translationContent.CASINA_INDEX_CONTENT_TEXT;
    await this.loadCasinaIndexContent();
    this.innerLoading = false;
  }
}
