import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { defineComponent, PropType } from 'vue';
import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { translations } from '../translations';
import { translations as transBase } from '../../../wgo-base/core/models/translations';

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
