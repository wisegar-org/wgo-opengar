import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { defineComponent, PropType } from 'vue';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { translations } from '../translations';
import { translations as transBase } from '@wisegar-org/wgo-base-models';

export default defineComponent({
  name: 'SendDocumentInfoStep',
  props: {
    name: Number,
    title: { type: String, default: '' },
    step: { type: Number, default: 2 },
    currentStep: Number,
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
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
    doneStep() {
      this.$emit('finish', this.step + 1);
    },
  },
  emits: ['finish'],
});
