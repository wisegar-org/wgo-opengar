import { ApiSettings } from 'src/boot/settings';
import {
  CasinaIndexContentInputsGql,
  LanguageResponseGql,
  StoragePageInputGql,
  TranslationFilterResponseGql,
  TranslationInputGql
} from 'src/graphql';
import {
  casinaModelsActionsKeys,
  casinaModelsNamespace
} from 'src/modules/casina/store/CasinaModels';
import {
  StorageServiceItem,
  StorageServicePageModel
} from '../../../models/StorageModels';
import {
  languageActions,
  languageGetters,
  languageMutations,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import {
  CasinaServiceType,
  ITranslationServicesAdminKeys,
  TranslationsKeys
} from './TranslationsKeys';
import ServiceEditorDialog from './ServiceEditors/ServiceEditorDialog.vue';
import ServiceEditorExpanded from './ServiceEditors/ServiceEditorExpanded.vue';
import TranslationComponent from '../../../../wgo/components/Translations/TranslationEditors/TranslationComponent.vue';
import { INotify, NumberDictionary } from 'src/modules/wgo/models';
import { TranslationIndexServicesKey } from '../IndexContent/TranslationsKeys';
import { componentsNamespace } from 'src/modules/wgo/store';
import { componentsActionsKeys } from 'src/modules/wgo/store/ComponentsState';

@Component({
  components: {
    ServiceEditorDialog,
    ServiceEditorExpanded,
    TranslationComponent
  }
})
export default class ServicesComponent extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationServicesAdminKeys;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;

  @Action(casinaModelsActionsKeys.getServicesByPagination, {
    namespace: casinaModelsNamespace
  })
  loadServices!: (
    data: StoragePageInputGql
  ) => Promise<StorageServicePageModel>;
  @Action(casinaModelsActionsKeys.setCasinaIndexContent, {
    namespace: casinaModelsNamespace
  })
  setCasinaIndexContent!: (
    data: CasinaIndexContentInputsGql
  ) => Promise<boolean>;
  @Mutation(languageMutations.addTranslations, { namespace: languageNamespace })
  addTranslations!: (obj: any) => unknown;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  innerLoading = true;
  loading = false;
  traslationServiceValue: NumberDictionary = {};
  transService: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: TranslationIndexServicesKey,
    id: TranslationIndexServicesKey
  };

  maxPage = 0;
  currentPage = 1;
  servicesCount = 0;
  servicesXPage = 5;
  search = '';
  services: StorageServiceItem[] = [];

  showAddEditorDialog = false;

  @Watch('currentPage')
  @Watch('language')
  async loadFilter() {
    this.loading = true;
    const items = await this.loadServices({
      type: CasinaServiceType,
      urlApi: ApiSettings.API_STATIC_BASE,
      search: this.search,
      skip: (this.currentPage - 1) * this.servicesXPage,
      take: this.servicesXPage,
      lang: this.language ? this.language.id : 0,
      loadTranslations: false
    });

    this.servicesCount = items.storageItemsCount;
    this.services = items.storageItems;
    this.maxPage =
      Math.floor(this.servicesCount / this.servicesXPage) +
      (this.servicesCount % this.servicesXPage > 0 ? 1 : 0);
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
      this.traslationServiceValue,
      TranslationIndexServicesKey
    );

    const arg = <CasinaIndexContentInputsGql>{
      imageId: 0,
      translations: translationsToSet
    };

    if (await this.setCasinaIndexContent(arg)) {
      const translations: { [key: string]: string } = {};
      if (this.language.id in this.traslationServiceValue) {
        translations[TranslationIndexServicesKey] = this.traslationServiceValue[
          this.language.id
        ];
      }
      this.addTranslations(translations);
      this.notify({
        message: this.translationContent
          .CASINA_SERVICES_ADMIN_CONTENT_SUCCESS_EDIT,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent
          .CASINA_SERVICES_ADMIN_CONTENT_FAIL_EDIT,
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
    this.transService.value = this.translationContent.CASINA_INDEX_SERVICES_TEXT;
    await this.loadFilter();
    this.innerLoading = false;
  }
}
