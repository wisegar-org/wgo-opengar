import { IEmailModel, IEmailMediaModel } from '../../../../../src/models/EmailModel';
import { defineComponent, PropType } from 'vue';
import EmailDetailsMediaTab from './EmailDetailsMediaTab.vue';
import EmailDetailsEmailTab from './EmailDetailsEmailTab.vue';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../../../../wgo-base/core/services/RouteService';
import { EmailMediaPaths } from '../../../router/paths/emailMediaPaths';

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
      label: 'Email Media',
    };
    const emailTab = {
      name: 'email',
      label: 'Email',
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
    };
  },
});
