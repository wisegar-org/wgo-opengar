import { LanguageResponseGql } from 'src/graphql';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { UserLogged } from '../../models/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import { userGetters, userNamespace } from '../../store/User';
import { ColumnsLanguages, setColumnsLanguage } from './ColumnsLanguages';
import EditLanguageDialog from './EditLanguage/EditLanguageDialog.vue';
import { ITranslationLanguageKeys, TranslationsKeys } from './TranslationsKeys';
import EditLanguageExpanded from './EditLanguage/EditLanguageExpanded.vue';

@Component({
  components: {
    EditLanguageDialog,
    EditLanguageExpanded
  }
})
export default class Language extends Vue {
  @Action(languageActions.loadAllLanguage, { namespace: languageNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationLanguageKeys;
  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  userLogged!: UserLogged;
  @Getter(languageGetters.getLanguages, { namespace: languageNamespace })
  languages!: LanguageResponseGql[];
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;
  columns = ColumnsLanguages;
  selectedLanguage: LanguageResponseGql | null = null;
  showEditLanguage = false;
  loading = false;
  innerLoading = true;

  showEditLanguageDialog(record: LanguageResponseGql | null) {
    this.selectedLanguage = record;
    this.showEditLanguage = true;
  }

  @Watch('translationContent')
  setColumnsLabels() {
    setColumnsLanguage(this.translationContent);
  }

  async onSuccessEdit(success: boolean) {
    if (success) {
      this.loading = true;
      await this.loadData(true);
      this.loading = false;
    }
  }

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
    this.setColumnsLabels();
    this.innerLoading = false;
    await this.loadData(false);
  }
}
