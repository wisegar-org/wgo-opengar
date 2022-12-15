import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { IUser } from '@wisegar-org/wgo-base-models';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { defineComponent, PropType } from 'vue';
import Dialog from '@wisegar-org/wgo-base-client/build/core/components/Dialog/Dialog.vue';
import { translations } from '../translations';
import SendDocumentUploadStep from '../SendDocumentUploadStep/SendDocumentUploadStep.vue';
import SendDocumentInfoStep from '../SendDocumentInfoStep/SendDocumentInfoStep.vue';
import SendDocumentConfirmStep from '../SendDocumentConfirmStep/SendDocumentConfirmStep.vue';

export default defineComponent({
  name: 'SendDocumentStepper',
  props: {
    open: Boolean,
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Dialog,
    SendDocumentUploadStep,
    SendDocumentConfirmStep,
    SendDocumentInfoStep,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const steps = {
      uploadStep: 1,
      confirmStep: 2,
      infoStep: 3,
    };
    const files: File[] = [];
    return {
      step: steps.uploadStep,
      translations,
      steps,
      files,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    moveStep(step: number) {
      this.step = step;
    },
    changeFiles(files: File[]) {
      this.files = files;
    },
    close() {
      this.$emit('close');
    },
  },
  emits: ['close'],
  watch: {
    open() {
      this.files = [];
      this.step = this.steps.uploadStep;
    },
  },
});
