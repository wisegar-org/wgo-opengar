import { IEmailModel, IEmailMediaModel } from '../../../../../src/models/EmailModel';
import { defineComponent, PropType } from 'vue';
import EmailDetailsMediaTab from './EmailDetailsMediaTab.vue';
import EmailDetailsEmailTab from './EmailDetailsEmailTab.vue';
import { useRouter } from 'vue-router';
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import { EmailMediaPaths } from '../../../router/paths/emailMediaPaths';
import { translations } from '../translations';
import { translations as tranBase } from '@wisegar-org/wgo-base-models';
import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';

export default defineComponent({
  name: 'EmailDetails',
  props: {
    email: {
      type: Object as PropType<IEmailModel>,
      default: {},
    },
    emailMedia: {
      type: Object as PropType<IEmailMediaModel>,
      default: {},
    },
  },
  components: {
    EmailDetailsMediaTab,
    EmailDetailsEmailTab,
  },
  data() {
    const emailMediaTab = {
      name: 'email_media',
      label: translations.TAB_EMAIL_MEDIA_TITLE,
    };
    const emailTab = {
      name: 'email',
      label: translations.TAB_EMAIL_TITLE,
    };
    const selectedTab = emailMediaTab.name;
    const router = useRouter();
    const routeService = new RouteService(router);
    const goBack = () => {
      routeService.goTo(EmailMediaPaths.emailMedia.path);
    };
    return {
      emailMediaTab,
      emailTab,
      selectedTab,
      goBack,
      translations,
      tranBase,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();

    return {
      tranStore,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
});
