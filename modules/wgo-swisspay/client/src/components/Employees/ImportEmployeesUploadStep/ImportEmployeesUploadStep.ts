import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { defineComponent, PropType } from 'vue';
import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { translations } from '../translations';
import { translations as transBase } from '../../../wgo-base/core/models/translations';
import { QUploader } from 'quasar';

export default defineComponent({
  name: 'ImportEmployeesUploadStep',
  props: {
    name: Number,
    title: { type: String, default: '' },
    step: { type: Number, default: 1 },
    currentStep: Number,
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    files: { type: Array as PropType<Array<File>>, default: [] },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      translations,
      transBase,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    addFile(files: readonly File[]) {
      if (this.files.length !== files.length || this.files[0] !== files[0]) {
        const filesResult = this.files.concat(files);
        this.$emit('changeFiles', filesResult);
      }
    },
    removeFile(files: readonly File[]) {
      const filesResult = this.files.filter((file) => files.indexOf(file) === -1);
      this.$emit('changeFiles', filesResult);
    },
    loadFiles(files: File[]) {
      const upl = this.$refs.employeeFile as QUploader;
      const filesResult = this.files.concat(files);
      this.$emit('changeFiles', filesResult);
    },
    doneStep() {
      this.$emit('moveStep', this.step + 1);
    },
  },
  emits: ['moveStep', 'changeFiles'],
  mounted() {
    if (this.files.length) {
      this.$nextTick(() => {
        (this.$refs.employeeFile as QUploader).reset();
        (this.$refs.employeeFile as QUploader).addFiles(this.files);
      });
    }
  },
});