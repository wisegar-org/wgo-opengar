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
  StorageDoctorItem,
  StorageDoctorPageModel
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
  CasinaDoctorType,
  ITranslationDoctorsAdminKeys,
  TranslationsKeys
} from './TranslationsKeys';
import DoctorEditorDialog from './DoctorEditors/DoctorEditorDialog.vue';
import DoctorEditorExpanded from './DoctorEditors/DoctorEditorExpanded.vue';
import TranslationComponent from '../../../../wgo/components/Translations/TranslationEditors/TranslationComponent.vue';
import { INotify, NumberDictionary } from 'src/modules/wgo/models';
import { TranslationIndexDoctorsKey } from '../IndexContent/TranslationsKeys';
import { componentsNamespace } from 'src/modules/wgo/store';
import { componentsActionsKeys } from 'src/modules/wgo/store/ComponentsState';

@Component({
  components: {
    DoctorEditorDialog,
    DoctorEditorExpanded,
    TranslationComponent
  }
})
export default class DoctorsComponent extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationDoctorsAdminKeys;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;

  @Action(casinaModelsActionsKeys.getDoctorsByPagination, {
    namespace: casinaModelsNamespace
  })
  loadDoctors!: (data: StoragePageInputGql) => Promise<StorageDoctorPageModel>;
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
  transDoctor: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: TranslationIndexDoctorsKey,
    id: TranslationIndexDoctorsKey
  };
  traslationDoctorValue: NumberDictionary = {};

  maxPage = 0;
  currentPage = 1;
  doctorsCount = 0;
  doctorsXPage = 5;
  search = '';
  doctors: StorageDoctorItem[] = [];

  showAddEditorDialog = false;

  @Watch('currentPage')
  @Watch('language')
  async loadFilter() {
    this.loading = true;
    const items = await this.loadDoctors({
      type: CasinaDoctorType,
      urlApi: ApiSettings.API_STATIC_BASE,
      search: this.search,
      skip: (this.currentPage - 1) * this.doctorsXPage,
      take: this.doctorsXPage,
      lang: this.language ? this.language.id : 0,
      loadTranslations: false
    });

    this.doctorsCount = items.storageItemsCount;
    this.doctors = items.storageItems;
    this.maxPage =
      Math.floor(this.doctorsCount / this.doctorsXPage) +
      (this.doctorsCount % this.doctorsXPage > 0 ? 1 : 0);
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
      this.traslationDoctorValue,
      TranslationIndexDoctorsKey
    );

    const arg = <CasinaIndexContentInputsGql>{
      imageId: 0,
      translations: translationsToSet
    };

    if (await this.setCasinaIndexContent(arg)) {
      const translations: { [key: string]: string } = {};
      if (this.language.id in this.traslationDoctorValue) {
        translations[TranslationIndexDoctorsKey] = this.traslationDoctorValue[
          this.language.id
        ];
      }
      this.addTranslations(translations);
      this.notify({
        message: this.translationContent
          .CASINA_DOCTORS_ADMIN_CONTENT_SUCCESS_EDIT,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.CASINA_DOCTORS_ADMIN_CONTENT_FAIL_EDIT,
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
    this.transDoctor.value = this.translationContent.CASINA_INDEX_DOCTORS_TEXT;
    await this.loadFilter();
    this.innerLoading = false;
  }
}
