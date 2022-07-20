import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, computed, PropType, ref, Ref } from 'vue';
import Table from '../../../../../wgo-base/core/components/Table/Table.vue';
import { ITableData, ITableRowButton } from '../../../../../wgo-base/core/models/Table';
import { BaseResizeComponent, BaseTranslateComponent } from '../../../../../wgo-base/core/components/BaseComponents';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { EmployeesService } from 'src/services/Employees/EmployeesService';
import { getEmployeesListSchema } from './EmployeesSchema';
import { translations } from './translations';
import { TranslationStore } from '../../../../../wgo-base/translation/models/TranslationStore';
import { Loading, useQuasar } from 'quasar';

export default defineComponent({
  name: 'EmployeesList',
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Table,
  },
  data(props) {
    const router = useRouter();
    const routeService = new RouteService(router);

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } = resizeComponent;

    const rowBtns: ITableRowButton[] = [
      {
        icon: 'delete',
        fnAction: this.deleteEmployee,
        tooltip: translations.DELETE,
      },
    ];

    return {
      open: false,
      schema: getEmployeesListSchema(props.tranStore, [], rowBtns),
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
  setup(props) {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const appStatusStore = useAppStatusStore();
    const tableData: Ref<ITableData[]> = ref([]);

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
      tableData,
      addEmployee() {
        // todo
        $q.dialog({
          title: getLabelFromName(translations.REGISTER_EMAIL_TITLE),
          message: getLabelFromName(translations.EMAIL_ADDRESS_FIELD_NAME),
          prompt: {
            model: '',
            type: 'text',
            isValid: isValidEmail,
          },
          ok: getLabelFromName(translations.OK_BUTTON),
          cancel: getLabelFromName(translations.CANCEL_BUTTON),
          persistent: true,
        })
          .onOk(async (data) => {
            Loading.show();
            const enterprise_id = authStore.authStore.user.id;
            if (await employeesService.registerEmployee(data, enterprise_id)) {
              $q.notify({
                type: 'positive',
                message: getLabelFromName(translations.EMAIL_SENDED_MESSAGE),
              });
            } else {
              $q.notify({
                type: 'negative',
                message: getLabelFromName(translations.EMAIL_NOT_SENDED_MESSAGE),
              });
            }
            Loading.hide();
          })
          .onCancel(() => {
            // Nothing to do
          });
      },
      deleteEmployee(row: any) {
        $q.dialog({
          title: getLabelFromName(translations.DELETE_EMPLOYEE_TITLE),
          message: getLabelFromName(translations.DELETE_EMPLOYEE_MESSAGE),
          ok: getLabelFromName(translations.OK_BUTTON),
          cancel: getLabelFromName(translations.CANCEL_BUTTON),
          persistent: true,
        })
          .onOk(async () => {
            Loading.show();
            const deletedEmployee = await employeesService.deleteEmployee(row.id);
            console.log(deletedEmployee);
            if (deletedEmployee) {
              const result = await employeesService.getAllEmployees({
                enterprise_id: { id: authStore.authStore.user.id },
              });

              console.log(result);

              tableData.value = result as any as ITableData[];
            }

            Loading.hide();
          })
          .onCancel(() => {
            // Nothing to do
          });
      },
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
      this.tableData = data as any as ITableData[];
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

function isValidEmail(email: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
