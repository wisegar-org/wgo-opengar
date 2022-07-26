import { IEmailModel } from '../../../../../src/models/EmailModel';
import { defineComponent, PropType } from 'vue';
import Dialog from '../../../wgo-base/core/components/Dialog/Dialog.vue';
import { UtilService } from '../../../wgo-base/core/services/UtilService';
import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { useTranslationStore } from 'src/stores/translationStore';
import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { translations } from '../translations';
import { translations as tranBase } from '../../../wgo-base/core/models';

export default defineComponent({
  name: 'EmailDetailsDialog',
  components: {
    Dialog,
  },
  props: {
    open: { type: Boolean, default: false },
    email: {
      type: Object as PropType<IEmailModel>,
      required: true,
    },
  },
  setup() {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      translations,
      tranBase,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  computed: {
    date() {
      return UtilService.parseDate(this.email.date);
    },
  },
  emits: {
    close() {
      return true;
    },
  },
});
