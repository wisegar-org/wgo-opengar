import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, PropType } from 'vue';
import Table from '@wisegar-org/wgo-base-client/build/core/components/Table/Table.vue';
import { ITableLeftButton, ITableRowButton } from '@wisegar-org/wgo-base-models/build/core/Table';
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { useRouter } from 'vue-router';
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { EmployeesService } from 'src/services/Employees/EmployeesService';
import { getEmployeesListSchema } from './EmployeesSchema';
import { translations } from '../translations';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { Loading } from 'quasar';
import { IUser, translations as transBase } from '@wisegar-org/wgo-base-models/build/core';
import SendEmployeeMailDialog from '../SendEmployeeMail/SendEmployeeMailDialog.vue';
import { IEmployeeModel, IEmployeeToImportModel } from '../../../../../src/models/EmployeesModel';
import SendDocumentStepper from '../SendDocument/SendDocumentStepper.vue';
import ImportEmployeesStepper from '../ImportEmployees/ImportEmployeesStepper.vue';
import ImportEmployeeEditorDialog from '../ImportEmployeesValidStep/ImportEmployeeEditorDialog.vue';
import { useNotifyStore } from 'src/stores/notifyStore';

export default defineComponent({
  name: 'EmployeesList',
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Table,
    SendEmployeeMailDialog,
    SendDocumentStepper,
    ImportEmployeesStepper,
    ImportEmployeeEditorDialog,
  },
  data(props) {
    const router = useRouter();
    const routeService = new RouteService(router);
    const tableData: IEmployeeModel[] = [];

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } = resizeComponent;
    const selectedUser: IUser = <IUser>{};
    const newEmployee: IEmployeeToImportModel = {} as IEmployeeToImportModel;

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
      {
        label: '',
        icon: 'upload',
        color: 'primary',
        tooltip: translations.IMPORT_EMPLOYEES_BTN,
        fnAction: this.importEmployees,
      },
    ];

    const { getLabel } = new BaseTranslateComponent();

    return {
      open: false,
      openWizard: false,
      openImportWizard: false,
      openEmployeeEditor: false,
      schema: getEmployeesListSchema(props.tranStore as any, leftBtns, rowBtns),
      getLabel: (name: string) => getLabel(this.tranStore, name),
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      routeService,
      translations,
      tableData,
      selectedUser,
      newEmployee,
    };
  },
  methods: {
    sendLinkEmployee() {
      this.open = true;
    },
    createUser(code: string) {
      this.closeEmployMailDialog();
      this.newEmployee = {
        code,
        email: '',
        lastName: '',
        name: '',
      };
      this.openEmployeeEditor = true;
    },
    async saveEmployee(employee: IEmployeeToImportModel) {
      this.closeEmployeeEditor();
      this.appStatusStore.loading = true;
      const result = await this.employeesService.importEmployeesList(this.authStore.user.id, [employee]);
      this.appStatusStore.loading = false;
      if (result && result.length > 0) {
        await this.loadEmployees();
      } else {
        this.notifyStore.setNotify({
          position: 'top',
          type: 'negative',
          message: this.getLabel(translations.CONFIRM_CREATE_USER_FAIL_MESSAGE),
        });
      }
    },
    closeEmployeeEditor() {
      this.openEmployeeEditor = false;
    },
    importEmployees() {
      this.openImportWizard = true;
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
    closeImportWizard() {
      this.openImportWizard = false;
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
    async loadEmployees() {
      this.closeImportWizard();
      const user = this.authStore.user;
      this.appStatusStore.loading = true;
      if (user.id) {
        this.tableData = await this.employeesService.getAllEmployees({
          enterprise_id: { id: user.id },
        });
      }
      this.appStatusStore.loading = false;
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

    const notifyStore = useNotifyStore();
    return {
      notifyStore,
      getLabelFromName,
      authStore: authStore.authStore,
      appStatusStore,
      employeesService,
    };
  },
  async mounted() {
    await this.loadEmployees();
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
