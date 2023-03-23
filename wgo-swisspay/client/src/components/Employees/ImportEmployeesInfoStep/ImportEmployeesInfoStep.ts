import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { defineComponent, PropType } from 'vue';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { translations } from '../translations';
import { authTranslations as transAuth } from '@wisegar-org/wgo-base-models/build/authentication';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { useAuthStore } from 'src/stores/authStore';
import { useNotifyStore } from 'src/stores/notifyStore';
import { IEmployeeToImportModel } from '../../../../../src/models/EmployeesModel';
import { useTranslationStore } from 'src/stores/translationStore';
import { getImportEmployeesInfoSchema } from './ImportEmployeesInfoSchema';
import { translations as tranBase } from '@wisegar-org/wgo-base-models/build/core';
import Table from '@wisegar-org/wgo-base-client/build/core/components/Table/Table.vue';

export default defineComponent({
  name: 'ImportEmployeesInfoStep',
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
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();

    const schema = getImportEmployeesInfoSchema(this.tranStore as any, [], []);
    schema.rowsPerPage = this.$q.platform.is.mobile ? [5, 10, 20, 0] : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];

    return {
      schema,
      translations,
      tranBase,
      transAuth,
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
    doneStep() {
      this.$emit('finish', this.step + 1);
    },
  },
  emits: ['finish'],
});
