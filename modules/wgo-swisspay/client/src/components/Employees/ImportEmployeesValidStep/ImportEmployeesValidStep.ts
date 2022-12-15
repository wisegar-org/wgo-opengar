import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { defineComponent, PropType } from 'vue';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { translations } from '../translations';
import { translations as transBase } from '@wisegar-org/wgo-base-models';
import { translations as transAuth } from '@wisegar-org/wgo-base-models';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { useAuthStore } from 'src/stores/authStore';
import { EmployeesService } from 'src/services/Employees/EmployeesService';
import { useNotifyStore } from 'src/stores/notifyStore';
import { IEmployeeModel, IEmployeeToImportModel } from '../../../../../src/models/EmployeesModel';
import { ITableRowButton } from '@wisegar-org/wgo-base-models';
import { useTranslationStore } from 'src/stores/translationStore';
import { getImportEmployeesListSchema } from './ImportEmployeesSchema';
import { translations as tranBase } from '@wisegar-org/wgo-base-models';
import Table from '@wisegar-org/wgo-base-client/build/core/components/Table/Table.vue';
import ImportEmployeeEditorDialog from './ImportEmployeeEditorDialog.vue';

export default defineComponent({
  name: 'ImportEmployeesValidStep',
  props: {
    name: Number,
    title: { type: String, default: '' },
    step: { type: Number, default: 2 },
    currentStep: Number,
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    employees: { type: Array as PropType<Array<IEmployeeToImportModel>>, default: [] },
  },
  components: {
    Table,
    ImportEmployeeEditorDialog,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const employeeList: IEmployeeToImportModel[] = this.employees.map((employee) => ({ ...employee }));
    const selectedEmployee: IEmployeeToImportModel = {} as any;
    const showEditDialog = false;

    const rowBtns: ITableRowButton[] = [
      {
        icon: 'edit',
        fnAction: this.editEmployee,
        tooltip: translations.SEND_DOCUMENT,
      },
      {
        icon: 'delete',
        fnAction: this.deleteEmployee,
        tooltip: translations.DELETE,
      },
    ];

    const schema = getImportEmployeesListSchema(this.tranStore as any, [], rowBtns);
    schema.rowDblClick = this.editEmployee as any;
    schema.rowsPerPage = this.$q.platform.is.mobile ? [5, 10, 20, 0] : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];

    return {
      schema,
      showEditDialog,
      employeeList,
      translations,
      transBase,
      transAuth,
      selectedEmployee,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  setup() {
    const appStatusStore = useAppStatusStore();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();
    const tranStore = useTranslationStore();
    return { appStatusStore, authStore: authStore.authStore, tranStore: tranStore.translationStore, notifyStore };
  },
  methods: {
    async onConfirm() {
      this.appStatusStore.setLoading(true);
      const employeeService = new EmployeesService();
      const result = await employeeService.importEmployeesList(this.authStore.user.id, this.employeeList);
      this.appStatusStore.setLoading(false);
      if (result) {
        this.doneStep(result);
      }
    },
    editEmployee(employee: any) {
      this.selectedEmployee = employee;
      this.showEditDialog = true;
    },
    saveEmployee(employee: any) {
      this.employeeList = this.employeeList.map((item) => (item.code === this.selectedEmployee.code ? employee : item));
      this.showEditDialog = false;
    },
    deleteEmployee(employee: any) {
      this.$q
        .dialog({
          title: this.getLabel(tranBase.CONFIRM),
          message: this.getLabel(translations.DELETE_EMPLOYEE_MESSAGE),
          persistent: true,
          focus: 'cancel',
          ok: {
            color: 'primary',
            label: this.getLabel(tranBase.CONFIRM),
            tabindex: 0,
          },
          cancel: {
            flat: true,
            label: this.getLabel(tranBase.CANCEL),
            tabindex: 1,
          },
        })
        .onOk(async () => {
          this.employeeList = this.employeeList.filter((item) => employee.code !== item.code);
        });
    },
    doneStep(employees: IEmployeeModel[]) {
      this.$emit('moveStep', this.step + 1, employees);
    },
    backStep() {
      this.$emit('moveStep', this.step - 1);
    },
  },
  watch: {
    employees() {
      this.employeeList = this.employees.map((employee) => ({ ...employee }));
    },
  },
  emits: ['moveStep'],
});
