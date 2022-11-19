import { Dialog } from "quasar";
import { AGVTemplateEnum, getAgvTemplateKey } from "src/models/Templates";
import { useNotifyStore } from "src/stores/notifyStore";
import { EmailService } from "src/wgo-base/email/services/EmailService";
import { TemplateService } from "src/wgo-base/template/services/TemplateService";
import { defineComponent } from "vue";
import ContactForm from "../ContactForm/ContactForm.vue";

export default defineComponent({
  name: "ComitatoContactForm",
  components: {
    ContactForm,
  },
  data(vm) {
    return {
      showLoader: false,
      emailService: new EmailService(),
      templateService: new TemplateService(),
    };
  },
  setup() {
    const notifyStore = useNotifyStore();
    return {
      notifyStore,
    };
  },
  methods: {
    async onSubmit(content: any, onReset: () => unknown) {
      this.showLoader = true;

      const data = {
        nome: content.nome,
        cognome: content.cognome,
        email: content.email,
        telefono: content.phone,
        messaggio: content.message,
      };

      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: content.subject,
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
