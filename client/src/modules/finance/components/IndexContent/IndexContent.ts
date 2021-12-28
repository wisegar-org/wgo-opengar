import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import MediaDiv from '../../../wgo/components/MediaDiv/MediaDiv.vue';
import { LanguageResponseGql, StorageAllInputGql } from 'src/graphql';
import { IndexContentModel, StorageModuleItem } from '../../models/models';
import ContactComponent from 'src/modules/wgo/components/Contact/ContactComponent.vue';
import MapComponent from 'src/modules/wgo/components/Map/MapComponent.vue';
import ModuleCard from 'src/modules/wgo/components/Cards/ModuleCard.vue';
import {
  ContactTranslationsKeys,
  contactTitle,
  contactBody,
  nameFieldLabel,
  nameFieldPlaceholder,
  emailFieldLabel,
  emailFieldPlaceholder,
  msgFieldLabel,
  msgFieldPlaceholder,
  btnSendLabel,
  subjectEmail,
  successEmailSend,
  failEmailSend,
  nameFieldRequiered,
  emailFieldRequiered,
  msgFieldRequiered,
  contentMapPhoneNumberLabel,
  contentMapEmailLabel,
  mapTitleSection
} from './ContactTranslations';
import { ApiSettings } from 'src/boot/settings';
import { TranslationIndexModulesKey } from '../admin/ModulesComponent/TranslationsKeys';

@Component({
  components: {
    MediaDiv,
    ContactComponent,
    MapComponent,
    ModuleCard
  }
})
export default class IndexContent extends Vue {
  @Action(githubActions.loadIndexContent, {
    namespace: githubNamespace
  })
  loadIndexContent!: () => Promise<void>;
  @Getter(githubGetters.getIndexContent, {
    namespace: githubNamespace
  })
  indexContent!: IndexContentModel;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;

  @Action(githubActions.getModules, {
    namespace: githubNamespace
  })
  loadModules!: (data: StorageAllInputGql) => Promise<StorageModuleItem[]>;

  innerLoading = true;
  loading = false;

  indexContentText = 'WGO_FINANCE_INDEX_CONTENT_TEXT';

  modulesList: StorageModuleItem[] = [];

  moduleName = 'finance';
  ModulesType = 'modules_finance';

  ContactTranslationsKeys = ContactTranslationsKeys;
  contactTitle = contactTitle;
  contactBody = contactBody;
  nameFieldLabel = nameFieldLabel;
  nameFieldPlaceholder = nameFieldPlaceholder;
  emailFieldLabel = emailFieldLabel;
  emailFieldPlaceholder = emailFieldPlaceholder;
  msgFieldLabel = msgFieldLabel;
  msgFieldPlaceholder = msgFieldPlaceholder;
  btnSendLabel = btnSendLabel;
  subjectEmail = subjectEmail;
  successEmailSend = successEmailSend;
  failEmailSend = failEmailSend;
  nameFieldRequiered = nameFieldRequiered;
  emailFieldRequiered = emailFieldRequiered;
  msgFieldRequiered = msgFieldRequiered;

  contentMapPhoneNumberLabel = contentMapPhoneNumberLabel;
  contentMapEmailLabel = contentMapEmailLabel;
  mapTitleSection = mapTitleSection;

  async created() {
    await this.registerTranslations({
      [this.indexContentText]: false,
      [TranslationIndexModulesKey]: false
    });
    await this.loadIndexContent();

    const modules = await this.loadModules({
      type: this.ModulesType,
      urlApi: ApiSettings.API_STATIC_BASE,
      lang: this.language ? this.language.id : 0
    });
    this.modulesList = modules;
    this.innerLoading = false;
  }
}
