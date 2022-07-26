import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, PropType } from 'vue';
import Table from '../../../wgo-base/core/components/Table/Table.vue';
import { ITableLeftButton, ITableRowButton } from '../../../wgo-base/core/models/Table';
import { BaseResizeComponent, BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../wgo-base/core/services/RouteService';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { EmployeesService } from 'src/services/Employees/EmployeesService';
import { getEmployeesListSchema } from './EmployeesSchema';
import { translations } from '../translations';
import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { Loading } from 'quasar';
import { IUser, translations as transBase } from '../../../wgo-base/core/models';
import SendEmployMailDialog from '../SendEmployeeMail/SendEmployeeMailDialog.vue';
import { IEmployeeModel } from 'app/../src/models/EmployeesModel';
import SendDocumentStepper from '../SendDocument/SendDocumentStepper.vue';

export default defineComponent({
  name: 'EmployeesList',
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Table,
    SendEmployMailDialog,
    SendDocumentStepper,
  },
  data(props) {
    const router = useRouter();
    const routeService = new RouteService(router);
    const tableData: IEmployeeModel[] = [];

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } = resizeComponent;
    const selectedUser: IUser = <IUser>{};

    const rowBtns: ITableRowButton[] = [
      {
        icon: 'send',
        fnAction: this.sendDocumentToEmployee,
        tooltip: translations.SEND_DOCUMENT,
      },
      {
        icon: 'delete',
        fnAction: this.deleteEmployee,
        tooltip: translations.DELETE,
      },
    ];

    const leftBtns: ITableLeftButton[] = [
      {
        label: '',
        icon: 'add',
        color: 'primary',
        tooltip: translations.ADD_EMPLOYEE_BTN,
        fnAction: this.sendLinkEmployee,
      },
    ];

    return {
      open: false,
      openWizard: false,
      schema: getEmployeesListSchema(props.tranStore as any, leftBtns, rowBtns),
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      routeService,
      translations,
      tableData,
      selectedUser,
    };
  },
  methods: {
    sendLinkEmployee() {
      this.open = true;
    },
    closeEmployMailDialog() {
      this.open = false;
    },
    sendDocumentToEmployee(row: any) {
      this.selectedUser = row.client;
      this.openWizard = true;
    },
    closeWizardSendDocument() {
      this.openWizard = false;
    },
    deleteEmployee(row: any) {
      this.$q
        .dialog({
          title: this.getLabelFromName(translations.DELETE_EMPLOYEE_TITLE),
          message: this.getLabelFromName(translations.DELETE_EMPLOYEE_MESSAGE),
          persistent: true,
          focus: 'cancel',
          ok: {
            color: 'primary',
            label: this.getLabelFromName(transBase.CONFIRM),
            tabindex: 0,
          },
          cancel: {
            flat: true,
            label: this.getLabelFromName(transBase.CANCEL),
            tabindex: 1,
          },
        })
        .onOk(async () => {
          Loading.show();
          const deletedEmployee = await this.employeesService.deleteEmployee(row.id);
          if (deletedEmployee) {
            this.tableData = await this.employeesService.getAllEmployees({
              enterprise_id: { id: this.authStore.user.id },
            });
          }

          Loading.hide();
        });
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
  },
  setup(props) {
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
      this.tableData = await this.employeesService.getAllEmployees({
        enterprise_id: { id: user.id },
      });
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
