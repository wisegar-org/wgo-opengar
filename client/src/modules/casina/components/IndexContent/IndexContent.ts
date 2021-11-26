import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { IndexContentModel } from '../../models/IndexContentModels';
import {
  casinaModelsActionsKeys,
  casinaModelsGettersKeys,
  casinaModelsNamespace
} from '../../store/CasinaModels';
import {
  ITranslationIndexContentKeys,
  TranslationsKeys
} from '../admin/IndexContent/TranslationsKeys';
import MediaDiv from '../../../wgo/components/MediaDiv/MediaDiv.vue';
import { LanguageResponseGql, StorageAllInputGql } from 'src/graphql';
import {
  StorageDoctorItem,
  StorageServiceItem
} from '../../models/StorageModels';
import { CasinaDoctorType } from '../admin/DoctorsComponent/TranslationsKeys';
import { ApiSettings } from 'src/boot/settings';
import { CasinaServiceType } from '../admin/ServicesComponent/TranslationsKeys';
import SimpleCard from '../../../wgo/components/Cards/SimpleCard.vue';
import ProfileCard from '../../../wgo/components/Cards/ProfileCard.vue';
import HorizontalProfileCard from '../../../wgo/components/Cards/HorizontalProfileCard.vue';

@Component({
  components: {
    MediaDiv,
    SimpleCard,
    ProfileCard,
    HorizontalProfileCard
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
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationIndexContentKeys;

  @Action(casinaModelsActionsKeys.getDoctorsByType, {
    namespace: casinaModelsNamespace
  })
  loadDoctors!: (data: StorageAllInputGql) => Promise<StorageDoctorItem[]>;
  @Action(casinaModelsActionsKeys.getServicesByType, {
    namespace: casinaModelsNamespace
  })
  loadServices!: (data: StorageAllInputGql) => Promise<StorageServiceItem[]>;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;

  innerLoading = true;
  doctors: StorageDoctorItem[] = [];
  services: StorageServiceItem[] = [];
  loading = false;

  @Watch('language')
  async loadDataCards() {
    this.loading = true;
    const doctors = await this.loadDoctors({
      type: CasinaDoctorType,
      urlApi: ApiSettings.API_STATIC_BASE,
      lang: this.language ? this.language.id : 0
    });
    this.doctors = doctors;
    const services = await this.loadServices({
      type: CasinaServiceType,
      urlApi: ApiSettings.API_STATIC_BASE,
      lang: this.language ? this.language.id : 0
    });
    this.services = services;
    this.loading = false;
  }

  async created() {
    await this.registerTranslations(TranslationsKeys);
    await this.loadCasinaIndexContent();
    await this.loadDataCards();
    this.innerLoading = false;
  }
}
