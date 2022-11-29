import { defineComponent, PropType } from "vue";
import Dialog from "src/wgo-base/core/components/Dialog/Dialog.vue";
import { useTranslationStore } from "src/stores/translationStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import { BaseTranslateComponent } from "src/wgo-base/core/components/BaseComponents";
import { translations } from "src/models/translations/newsletter";
import { AgvNewsletterInscriptionResponse } from "../../../../src/models/Newsletter";
import { AGVNewsletterInscriptionStatusEnum } from "src/models/Newsletter";
import { UtilService } from "src/wgo-base/core/services/UtilService";
import { translations as transBase } from "src/wgo-base/core/models";
import { NewsletterInscriptionService } from "src/services/Newsletter/NwLtInscriptionService";

export default defineComponent({
  name: "NsLtInscriptionAdminEditor",
  props: {
    open: { type: Boolean, default: false },
    inscription: {
      type: Object as PropType<AgvNewsletterInscriptionResponse>,
      required: true,
    },
  },
  components: {
    Dialog,
  },
  data(vm) {
    const { getLabel } = new BaseTranslateComponent();
    const statusOptions = [
      AGVNewsletterInscriptionStatusEnum.Waiting,
      AGVNewsletterInscriptionStatusEnum.Cancelled,
    ];
    return {
      transBase,
      statusOptions,
      translations,
      inscriptionService: new NewsletterInscriptionService(),
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
    };
  },
  setup(props, ctx) {
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();

    return {
      appStatusStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    isValid() {
      return UtilService.isValidEmail(this.inscription.email);
    },
    async saveInscription() {
      this.appStatusStore.setLoading(true);
      const inscription = {
        id: this.inscription.id,
        email: this.inscription.email,
        status: this.inscription.status,
      };
      const result = this.inscription.id
        ? await this.inscriptionService.editNewsletterInscription(inscription)
        : await this.inscriptionService.addNewsletterInscription(inscription);

      this.appStatusStore.setLoading(false);
      if (result) this.$emit("close", true, this.inscription.email);
    },
  },
});
