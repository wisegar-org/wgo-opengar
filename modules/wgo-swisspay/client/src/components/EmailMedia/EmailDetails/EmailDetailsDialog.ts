import { IEmailModel } from '../../../../../src/models/EmailModel';
import { defineComponent, PropType } from 'vue';
import Dialog from '@wisegar-org/wgo-base-client/build/core/components/Dialog/Dialog.vue';
import { UtilService } from '@wisegar-org/wgo-base-client/build/core/services/UtilService';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { useTranslationStore } from 'src/stores/translationStore';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { translations } from '../translations';
import { translations as tranBase } from '@wisegar-org/wgo-base-models/build/core';

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
