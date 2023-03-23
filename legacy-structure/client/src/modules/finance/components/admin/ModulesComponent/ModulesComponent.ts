import { ApiSettings } from 'src/boot/settings';
import {
  FinanceIndexContentInputsGql,
  LanguageResponseGql,
  StoragePageInputGql,
  TranslationFilterResponseGql,
  TranslationInputGql
} from 'src/graphql';
import {
  languageActions,
  languageGetters,
  languageMutations,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import {
  FinanceModuleType,
  ITranslationModulesAdminKeys,
  TranslationIndexModulesKey,
  TranslationsKeys
} from './TranslationsKeys';
import ModuleEditorDialog from './ModuleEditors/ModuleEditorDialog.vue';
import ModuleEditorExpanded from './ModuleEditors/ModuleEditorExpanded.vue';
import TranslationComponent from '../../../../wgo/components/Translations/TranslationEditors/TranslationComponent.vue';
import { INotify, NumberDictionary } from 'src/modules/wgo/models';
import { componentsNamespace } from 'src/modules/wgo/store';
import { componentsActionsKeys } from 'src/modules/wgo/store/ComponentsState';
import { StorageModuleItem, StorageModulePageModel } from 'src/modules/finance/models/models';
import { githubActions, githubNamespace } from 'src/modules/finance/store';

@Component({
  components: {
    ModuleEditorDialog,
    ModuleEditorExpanded,
    TranslationComponent
  }
})
export default class ModulesComponent extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationModulesAdminKeys;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;

  @Action(githubActions.getModulesByPagination, {
    namespace: githubNamespace
  })
  loadModules!: (data: StoragePageInputGql) => Promise<StorageModulePageModel>;
  @Action(githubActions.setIndexContent, {
    namespace: githubNamespace
  })
  setFinanceIndexContent!: (
    data: FinanceIndexContentInputsGql
  ) => Promise<boolean>;
  @Mutation(languageMutations.addTranslations, { namespace: languageNamespace })
  addTranslations!: (obj: any) => unknown;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  innerLoading = true;
  loading = false;
  transModule: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: TranslationIndexModulesKey,
    id: TranslationIndexModulesKey
  };
  traslationModuleValue: NumberDictionary = {};

  maxPage = 0;
  currentPage = 1;
  modulesCount = 0;
  modulesXPage = 5;
  search = '';
  modulesList: StorageModuleItem[] = [];

  showAddEditorDialog = false;

  @Watch('currentPage')
  @Watch('language')
  async loadFilter() {
    this.loading = true;
    const items = await this.loadModules({
      type: FinanceModuleType,
      urlApi: ApiSettings.API_STATIC_BASE,
      search: this.search,
      skip: (this.currentPage - 1) * this.modulesXPage,
      take: this.modulesXPage,
      lang: this.language ? this.language.id : 0,
      loadTranslations: false
    });
    this.modulesCount = items.storageItemsCount;
    this.modulesList = items.storageItems;
    this.maxPage =
      Math.floor(this.modulesCount / this.modulesXPage) +
      (this.modulesCount % this.modulesXPage > 0 ? 1 : 0);
    this.loading = false;
  }

  onChangeIndexContent(
    translations: NumberDictionary,
    langId: number,
    value: string
  ) {
    translations[langId] = value;
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
    translationsToSet = this.getTranslationItem(
      this.traslationModuleValue,
      TranslationIndexModulesKey
    );

    const arg = <FinanceIndexContentInputsGql>{
      imageId: 0,
      translations: translationsToSet
    };

    if (await this.setFinanceIndexContent(arg)) {
      const translations: { [key: string]: string } = {};
      if (this.language.id in this.traslationModuleValue) {
        translations[TranslationIndexModulesKey] = this.traslationModuleValue[
          this.language.id
        ];
      }
      this.addTranslations(translations);
      this.notify({
        message: this.translationContent
          .FINANCE_MODULES_ADMIN_CONTENT_SUCCESS_EDIT,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.FINANCE_MODULES_ADMIN_CONTENT_FAIL_EDIT,
        type: 'negative'
      });
    }

    this.loading = false;
  }

  async onSuccess(success: boolean) {
    this.showAddEditorDialog = false;
    if (success) await this.loadFilter();
  }

  async searchFilter() {
    this.currentPage = 1;
    await this.loadFilter();
  }

  async cleanFilter() {
    this.search = '';
    await this.searchFilter();
  }

  async created() {
    await this.registerTranslations(TranslationsKeys);
    this.transModule.value = this.translationContent.FINANCE_INDEX_MODULE_TEXT;
    await this.loadFilter();
    this.innerLoading = false;
  }
}
