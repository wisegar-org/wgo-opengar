import { useTranslationStore } from "src/stores/translationStore";
import { defineComponent } from "vue";
import MapComponent from "@wisegar-org/wgo-base-client/build/contact/components/MapComponent/MapComponent.vue";
import ContactForm from "../ContactForm/ContactForm.vue";
import TextVue from "@wisegar-org/wgo-base-client/build/core/components/Text/Text.vue";
import { AGVTemplateEnum, getAgvTemplateKey } from "src/models/Templates";
import { Dialog } from "quasar";
import { useNotifyStore } from "src/stores/notifyStore";
import { EmailService } from "@wisegar-org/wgo-base-client/build/email/services/EmailService";
import { TemplateService } from "@wisegar-org/wgo-base-client/build/template/services/TemplateService";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { StringDictionary } from "@wisegar-org/wgo-base-models/build/core";

export default defineComponent({
  name: "ContactComponent",
  components: {
    TextVue,
    MapComponent,
    ContactForm,
  },
  data() {
    return {
      showLoader: true,
      emailService: new EmailService(),
      templateService: new TemplateService(),
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const notifyStore = useNotifyStore();

    return {
      notifyStore,
      tranStore: tranStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async onSubmit(content: StringDictionary, onReset: () => unknown) {
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
