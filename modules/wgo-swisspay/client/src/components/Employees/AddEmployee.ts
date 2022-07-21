import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, PropType } from 'vue';
import { BaseTranslateComponent } from '../../../../../wgo-base/core/components/BaseComponents';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { EmployeesService } from 'src/services/Employees/EmployeesService';
import { translations } from './translations';
import { translations as tranBase } from '../../../../../wgo-base/core/models';
import { TranslationStore } from '../../../../../wgo-base/translation/models/TranslationStore';
import { useQuasar } from 'quasar';
import { Paths } from '../../router/paths';

export default defineComponent({
  name: 'AddEmployee',
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {},
  methods: {
    async addEmployee() {
      if (
        await this.employeesService.addEmployee(
          this.userData.email,
          this.userData.name,
          this.userData.enterprise_id,
          this.userData.client_id
        )
      ) {
        this.$q.notify({
          type: 'positive',
          message: this.getLabelFromName(translations.ADDED_EMPLOYEE_MESSAGE),
        });
        this.goToHome();
      } else {
        this.$q.notify({
          type: 'negative',
          message: this.getLabelFromName(translations.ADDED_EMPLOYEE_ERROR_MESSAGE),
        });
      }
    },
    goToHome() {
      this.routeService.goTo(Paths.home.path);
    },
  },
  data() {
    const router = useRouter();
    const routeService = new RouteService(router);

    const userData = {
      email: '',
      name: '',
      enterprise_id: 0,
      client_id: 0,
    };

    return {
      open: true,
      routeService,
      translations,
      userData,
      tranBase,
      innerLoading: true,
    };
  },
  setup(props) {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const appStatusStore = useAppStatusStore();
    const employeesService = new EmployeesService();

    const { getLabel } = new BaseTranslateComponent();
    function getLabelFromName(name: string) {
      return getLabel(props.tranStore, name);
    }

    return {
      getLabelFromName,
      authStore: authStore.authStore,
      appStatusStore,
      employeesService,
    };
  },
  async mounted() {
    const user = this.authStore.user;
    this.appStatusStore.loading = true;
    if (user.id) {
      this.userData.client_id = user.id;
      this.userData.email = user.email;
      this.userData.name = user.name;
    }

    // get token from query
    const token = this.$route.query.token as string;
    if (token) {
      const resp = await this.employeesService.checkEmployeeToken(token);
      if (resp) {
        this.userData.enterprise_id = resp;
      } else {
        this.goToHome();
        this.$q.notify({
          type: 'negative',
          message: this.getLabelFromName(translations.INVALID_TOKEN_EMPLOYEE),
        });
      }
    } else {
      this.goToHome();
      this.$q.notify({
        type: 'negative',
        message: this.getLabelFromName(translations.MISSING_TOKEN_EMPLOYEE),
      });
    }
    this.innerLoading = false;
    this.appStatusStore.loading = false;
  },
});
