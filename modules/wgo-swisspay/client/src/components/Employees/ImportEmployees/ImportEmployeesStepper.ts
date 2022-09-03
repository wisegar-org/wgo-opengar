import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { IUser } from '../../../wgo-base/core/models';
import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { defineComponent, PropType } from 'vue';
import Dialog from '../../../wgo-base/core/components/Dialog/Dialog.vue';
import { translations } from '../translations';
import ImportEmployeesUploadStep from '../ImportEmployeesUploadStep/ImportEmployeesUploadStep.vue';
import ImportEmployeesValidStep from '../ImportEmployeesValidStep/ImportEmployeesValidStep.vue';
import ImportEmployeesInfoStep from '../ImportEmployeesInfoStep/ImportEmployeesInfoStep.vue';
import { IEmployeeModel, IEmployeeToImportModel } from '../../../../../src/models/EmployeesModel';
import { EmployeesService } from '../../../services/Employees/EmployeesService';
import { useAuthStore } from '../../../stores/authStore';
import { useAppStatusStore } from '../../../stores/appStatusStore';

export default defineComponent({
  name: 'ImportEmployeesStepper',
  props: {
    open: Boolean,
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Dialog,
    ImportEmployeesUploadStep,
    ImportEmployeesValidStep,
    ImportEmployeesInfoStep,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const employeeList: IEmployeeToImportModel[] = [];
    const steps = {
      uploadStep: 1,
      confirmStep: 2,
      infoStep: 3,
    };
    const files: File[] = [];
    const employeeImported: IEmployeeModel[] = [];
    return {
      step: steps.uploadStep,
      employeeImported,
      employeeList,
      translations,
      steps,
      files,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  setup() {
    const authStore = useAuthStore();
    const appStatusStore = useAppStatusStore();
    return {
      authStore: authStore.authStore,
      appStatusStore,
    };
  },
  methods: {
    async processDocs(step: number) {
      this.appStatusStore.setLoading(true);
      const employeeService = new EmployeesService();
      const employess = await employeeService.getEmployeesByFiles(this.authStore.user.id || 0, this.files);
      this.appStatusStore.setLoading(false);
      this.employeeList = employess;
      this.step = step;
    },
    async importedEmployee(step: number, employees: IEmployeeModel[]) {
      this.employeeImported = employees;
      this.step = step;
    },
    moveStep(step: number) {
      this.step = step;
    },
    changeFiles(files: File[]) {
      this.files = files;
    },
    onSuccessClose() {
      this.$emit('success');
    },
    close() {
      this.$emit('close');
    },
  },
  emits: ['close', 'success'],
  watch: {
    open() {
      this.files = [];
      this.step = this.steps.uploadStep;
    },
  },
});
