import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { defineComponent, PropType } from 'vue';
import { IUser } from '../../../wgo-base/core/models';
import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { translations } from '../translations';
import { translations as transBase } from '../../../wgo-base/core/models/translations';
import { translations as transAuth } from '../../../wgo-base/authentication/models/translations';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { useAuthStore } from 'src/stores/authStore';
import { EmployeesService } from 'src/services/Employees/EmployeesService';
import { useNotifyStore } from 'src/stores/notifyStore';

export default defineComponent({
  name: 'SendDocumentConfirmStep',
  props: {
    name: Number,
    title: { type: String, default: '' },
    step: { type: Number, default: 2 },
    currentStep: Number,
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
    files: { type: Array as PropType<Array<File>>, default: [] },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      translations,
      transBase,
      transAuth,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  setup() {
    const appStatusStore = useAppStatusStore();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();
    return { appStatusStore, authStore: authStore.authStore, notifyStore };
  },
  methods: {
    async onConfirm() {
      this.appStatusStore.setLoading(true);
      const employeeService = new EmployeesService();
      const result = await employeeService.sendEmployeeDocuments(this.user.id, this.authStore.user.id, this.files);
      this.appStatusStore.setLoading(false);
      if (result) {
        this.doneStep();
      }
    },
    doneStep() {
      this.$emit('moveStep', this.step + 1);
    },
    backStep() {
      this.$emit('moveStep', this.step - 1);
    },
  },
  emits: ['moveStep'],
});
