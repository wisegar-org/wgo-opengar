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
  TranslationIndexContentKey,
  TranslationIndexPageTitleKey,
  TranslationIndexPageFooterKey
} from './TranslationsKeys';
import {
  FinanceIndexContentInputsGql,
  LanguageResponseGql,
  MediaResponseGql,
  TranslationFilterResponseGql,
  TranslationInputGql
} from 'src/graphql';
import {
  githubActions,
  githubGetters,
  githubNamespace
} from 'src/modules/finance/store';
import { IndexContentModel } from 'src/modules/finance/models/models';
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
  @Action(githubActions.loadIndexContent, {
    namespace: githubNamespace
  })
  loadFinanceIndexContent!: () => Promise<void>;
  @Getter(githubGetters.getIndexContent, {
    namespace: githubNamespace
  })
  indexContent!: IndexContentModel;
  @Action(githubActions.setIndexContent, {
    namespace: githubNamespace
  })
  setFinanceIndexContent!: (
    data: FinanceIndexContentInputsGql
  ) => Promise<boolean>;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationIndexContentKeys;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;
  
  transPageTitle: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: TranslationIndexPageTitleKey,
    id: TranslationIndexPageTitleKey
  };
  transContent: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: TranslationIndexContentKey,
    id: TranslationIndexContentKey
  };
  transPageFooter: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: TranslationIndexPageFooterKey,
    id: TranslationIndexPageFooterKey
  };
  
  
  
  @Mutation(languageMutations.addTranslations, { namespace: languageNamespace })
  addTranslations!: (obj: any) => unknown;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  traslationContentValue: NumberDictionary = {};
  traslationPageTitleValue: NumberDictionary = {};
  traslationPageFooterValue: NumberDictionary = {};

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
      this.getTranslationItem(this.traslationPageTitleValue, TranslationIndexPageTitleKey),
      this.getTranslationItem(this.traslationContentValue, TranslationIndexContentKey),
      this.getTranslationItem(this.traslationPageFooterValue, TranslationIndexPageFooterKey)
    );

    const arg = <FinanceIndexContentInputsGql>{
      imageId: this.imgIndex ? this.imgIndex.id : 0,
      translations: translationsToSet
    };

    if (await this.setFinanceIndexContent(arg)) {
      const translations: { [key: string]: string } = {};
      if (this.language.id in this.traslationPageTitleValue) {
        translations[TranslationIndexPageTitleKey] = this.traslationPageTitleValue[
          this.language.id
        ];
      }
      if (this.language.id in this.traslationContentValue) {
        translations[TranslationIndexContentKey] = this.traslationContentValue[
          this.language.id
        ];
      }
      if (this.language.id in this.traslationPageFooterValue) {
        translations[TranslationIndexPageFooterKey] = this.traslationPageFooterValue[
          this.language.id
        ];
      }
      this.addTranslations(translations);
      this.notify({
        message: this.translationContent.FINANCE_INDEX_CONTENT_SUCCESS_EDIT,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.FINANCE_INDEX_CONTENT_FAIL_EDIT,
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
    this.transPageTitle.value = this.translationContent.WGO_FINANCE_INDEX_TITLE;
    this.transContent.value = this.translationContent.WGO_FINANCE_INDEX_CONTENT_TEXT;
    this.transPageFooter.value = this.translationContent.WGO_FINANCE_INDEX_FOOTER_LABEL;
    await this.loadFinanceIndexContent();
    this.innerLoading = false;
  }
}
