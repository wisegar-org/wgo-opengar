import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/wgo-base/core/components/BaseComponents";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import { defineComponent, PropType } from "vue";
import { translations } from "src/models/translations/inscriptions";
import Dialog from "src/wgo-base/core/components/Dialog/Dialog.vue";
import { AgvInscriptionResponseModel } from "src/models/models";
import { UtilService } from "src/wgo-base/core/services/UtilService";
import { translations as transBase } from "src/wgo-base/core/models";

export default defineComponent({
  name: "InscriptionAdminDetails",
  props: {
    open: { type: Boolean, default: false },
    inscription: {
      type: Object as PropType<AgvInscriptionResponseModel>,
      required: true,
    },
  },
  components: { Dialog },
  data(vm) {
    const { getLabel } = new BaseTranslateComponent();
    return {
      transBase,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
    };
  },
  setup(props, ctx) {
    const translationStore = useTranslationStore();

    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    getFormatDate(data: string | Date) {
      return UtilService.parseDate(data, "DD/MM/YYYY");
    },
  },
  emits: ["close"],
});
