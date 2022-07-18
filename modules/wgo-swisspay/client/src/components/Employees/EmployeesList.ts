import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, computed, PropType } from 'vue';
import Table from '../../../../../wgo-base/core/components/Table/Table.vue';
import { ITableData } from '../../../../../wgo-base/core/models/Table';
import { BaseResizeComponent } from '../../../../../wgo-base/core/components/BaseComponents';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { EmployeesService } from 'src/services/Employees/EmployeesService';
import { getEmployeesListSchema } from './EmployeesSchema';
import { translations } from './translations';
import { TranslationStore } from '../../../../../wgo-base/translation/models/TranslationStore';

export default defineComponent({
  name: 'EmployeesList',
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Table,
  },
  data(props) {
    const employeesService = new EmployeesService();
    const data = [] as ITableData[];
    const router = useRouter();
    const routeService = new RouteService(router);

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } = resizeComponent;
    return {
      data,
      employeesService,
      open: false,
      schema: getEmployeesListSchema(props.tranStore, [], []),
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      routeService,
      translations,
    };
  },
  methods: {
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
  },
  setup() {
    const authStore = useAuthStore();
    const appStatusStore = useAppStatusStore();
    return {
      authStore: authStore.authStore,
      appStatusStore,
    };
  },
  async mounted() {
    const user = this.authStore.user;
    this.appStatusStore.loading = true;
    if (user.id) {
      const data = await this.employeesService.getAllEmployees({
        enterprise_id: { id: user.id },
      });
      console.log('data', data);
      this.data = data as any as ITableData[];
    }
    this.appStatusStore.loading = false;
  },
  created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});
