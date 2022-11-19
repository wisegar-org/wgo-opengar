import { useTranslationStore } from "src/stores/translationStore";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import { defineComponent } from "vue";
import MapComponent from "../../wgo-base/contact/components/MapComponent/MapComponent.vue";
import ContactForm from "../ContactForm/ContactForm.vue";
import Text from "../../wgo-base/core/components/Text/Text.vue";
import { EmailService } from "src/wgo-base/email/services/EmailService";
import { TemplateService } from "src/wgo-base/template/services/TemplateService";
import { AGVTemplateEnum, getAgvTemplateKey } from "src/models/Templates";
import { Dialog } from "quasar";
import { useNotifyStore } from "src/stores/notifyStore";

export default defineComponent({
  name: "ContactComponent",
  components: {
    Text,
    MapComponent,
    ContactForm,
  },
  data(vm) {
    return {
      showLoader: true,
      emailService: new EmailService(),
      templateService: new TemplateService(),
    };
  },
  setup(props, ctx) {
    const tranStore = useTranslationStore();
    const notifyStore = useNotifyStore();

    return {
      notifyStore,
      tranStore: tranStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async onSubmit(content: any, onReset: () => unknown) {
      this.showLoader = true;
      const subject = `Contatto - ${content.nome} ${content.cognome}`;

      const data = {
        nome: content.nome,
        cognome: content.cognome,
        email: content.email,
        telefono: content.phone,
        messaggio: content.message,
      };

      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: `Oggetto: ${subject}`,
          body: getAgvTemplateKey(AGVTemplateEnum.EmailContact),
          to: `<${content.email}> "${content.nome} ${content.cognome}"`,
          data: JSON.stringify(data),
        })
      ) {
        this.showLoader = false;
        Dialog.create({
          title: "Assemblea dei Genitori Vezia",
          message: "Grazie!",
          cancel: {
            unelevated: true,
            color: "primary",
            label: "Chiudere",
          },
          ok: false,
          persistent: true,
        });
        onReset();
      } else {
        this.showLoader = false;
        this.notifyStore.setNotify({
          message: "L'invio della posta non è riuscito",
          position: "top",
          type: "negative",
        });
      }
    },
  },
});
