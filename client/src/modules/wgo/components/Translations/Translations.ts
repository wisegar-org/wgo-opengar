import {
  ImportTranslationsInputGql,
  LanguageResponseGql,
  TranslationExportResponseGql,
  TranslationFilterInputGql,
  TranslationFilterPageResponseGql,
  TranslationFilterResponseGql
} from 'src/graphql';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  languageActions,
  languageNamespace,
  languageGetters
} from '../../store/Language';
import TranslationEditor from './TranslationEditors/TranslationEditor.vue';
import LanguageSimpleSelect from '../Languages/LanguageSelect/LanguageSimpleSelect.vue';
import { componentsNamespace } from '../../store';
import { componentsActionsKeys } from '../../store/ComponentsState';
import { INotify } from '../../models';
import { QFile } from 'quasar';
import {
  ITranslationTranslationKeys,
  TranslationsKeys
} from './TranslationsKeys';
import SimpleExpanded from '../Expanded/SimpleExpanded.vue';

@Component({
  components: {
    TranslationEditor,
    LanguageSimpleSelect,
    SimpleExpanded
  }
})
export default class Translations extends Vue {
  @Action(languageActions.loadAllLanguage, { namespace: languageNamespace })
  loadData!: (force: boolean) => Promise<unknown>;
  @Action(languageActions.loadTranslations, { namespace: languageNamespace })
  loadTranslations!: (
    filter: TranslationFilterInputGql
  ) => Promise<TranslationFilterPageResponseGql>;

  @Action(languageActions.exportTranslations, { namespace: languageNamespace })
  exportTranslations!: () => Promise<TranslationExportResponseGql>;
  @Action(languageActions.importTranslations, { namespace: languageNamespace })
  importTranslations!: (data: ImportTranslationsInputGql) => Promise<boolean>;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationTranslationKeys;
  @Getter(languageGetters.getEnabledLanguages, { namespace: languageNamespace })
  languages!: LanguageResponseGql[];
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  languageSelected!: LanguageResponseGql;
  @Getter(languageGetters.getKeysTranslations, { namespace: languageNamespace })
  keysTranslations!: unknown;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  translations: TranslationFilterResponseGql[] = [];
  translationsCount = 0;
  translationXPage = 5;
  language: LanguageResponseGql | null = null;
  maxPage = 0;
  currentPage = 1;
  search = '';
  loading = false;
  innerLoading = true;
  id_input =
    'upload-button-' +
    Math.random()
      .toString(36)
      .substring(2, 10);

  @Watch('language')
  @Watch('currentPage')
  @Watch('keysTranslations.length')
  async loadFilter() {
    this.loading = true;
    const result = await this.loadTranslations(<TranslationFilterInputGql>{
      languageId: this.language?.id || 0,
      search: this.search,
      skip:
        this.translationXPage *
        (Math.floor(this.currentPage - 1) + (this.currentPage % 1 > 0 ? 1 : 0)),
      take: this.translationXPage
    });
    this.translationsCount = result.translationsCount;
    this.maxPage =
      Math.floor(this.translationsCount / this.translationXPage) +
      (this.translationsCount % this.translationXPage > 0 ? 1 : 0);
    this.translations = result.translations;

    this.loading = false;
  }

  changeLanguage(lang: LanguageResponseGql) {
    this.language = lang;
  }

  async cleanFilter() {
    this.search = '';
    await this.loadFilter();
  }

  async clickImportTranslations(file: unknown[]) {
    this.loading = true;
    const formData: ImportTranslationsInputGql = <ImportTranslationsInputGql>{
      languageId: this.languageSelected.id,
      file: file
    };

    const result = await this.importTranslations(formData);
    this.loading = false;
    if (result) {
      await this.loadFilter();
      this.notify({
        message: 'Success import translations',
        type: 'positive'
      });
    }
  }

  async clickExportTranslations() {
    this.loading = true;
    const result = await this.exportTranslations();
    this.loading = false;
    if (result.isSuccess) {
      const fileUrl = `data:${'text/plain'};base64,${result.data || ''}`;

      void fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          const link = window.document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'translations.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    }
  }

  openLoadFile() {
    (this.$refs[this.id_input] as QFile).pickFiles();
  }

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
    await this.loadData(false);
    this.language = this.languages.length > 0 ? this.languages[0] : null;
    await this.loadFilter();
    this.innerLoading = false;
  }
}
