import { Dialog } from "quasar";
import {
  AgvEventResponseModel,
  AgvInscriptionInputModel,
} from "src/models/models";
import { IPoll } from "src/models/Poll";
import { AGVTemplateEnum, getAgvTemplateKey } from "src/models/Templates";
import { InscriptionService } from "src/services/Inscription/InscriptionService";
import { PollService } from "src/services/PollService";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { useNotifyStore } from "src/stores/notifyStore";
import { EmailService } from "src/wgo-base/email/services/EmailService";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "EventEnrollmentForm",
  props: {
    event: { type: Object as PropType<AgvEventResponseModel>, required: true },
  },
  data(vm) {
    const formContact = {
      id: 0,
      nome: "",
      cognome: "",
      email: "",
      phone: "",
      message: "",
      class: "",
    };
    const showLoader = false;
    const pollConfig: IPoll = {} as IPoll;
    return {
      formContact,
      pollConfig,
      inscriptionService: new InscriptionService(),
      emailService: new EmailService(),
    };
  },
  setup(props, ctx) {
    const notifyStore = useNotifyStore();
    const appStatusStore = useAppStatusStore();
    return {
      notifyStore,
      appStatusStore,
    };
  },
  methods: {
    async onSubmit() {
      this.appStatusStore.setLoading(true);

      const result = await this.inscriptionService.createInscription(<
        AgvInscriptionInputModel
      >{
        ...this.formContact,
        eventId: this.event.id,
      });
      if (result.create) {
        await this.sendEmailMessage(false);
        this.appStatusStore.setLoading(false);
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
        this.onReset();
      } else if (result.exist) {
        await this.sendEmailMessage(true);
        this.appStatusStore.setLoading(false);
        Dialog.create({
          title: "Assemblea dei Genitori Vezia",
          message: "La registrazione esiste già. Grazie!",
          cancel: {
            unelevated: true,
            color: "primary",
            label: "Chiudere",
          },
          ok: false,
          persistent: true,
        });
      } else {
        this.appStatusStore.setLoading(false);
        this.notifyStore.setNotify({
          message: "Iscrizione non riuscita",
          type: "negative",
          position: "top",
        });
      }
    },
    async sendEmailMessage(alreadyExist: boolean) {
      const content = this.formContact;
      const data = {
        utente: {
          nome: content.nome,
          cognome: content.cognome,
          email: content.email,
          telefono: content.phone,
          messaggio: `<p>${content.message.split("\n").join("</p><p>")}</p>`,
          classe: content.class,
        },
        evento: {
          titolo: this.event.title,
          tipo: this.event.type,
          corso: this.event.class,
          datadInizio: this.event.startDate,
          datadiFine: this.event.endDate,
          descrizione: this.event.description,
          breveDescrizione: this.event.shortDescription,
          url: window.location.href,
        },
      };
      let body = getAgvTemplateKey(
        alreadyExist
          ? AGVTemplateEnum.InscriptionRepeated
          : AGVTemplateEnum.Inscription
      );
      const subject = `Iscrizione - ${this.event.title}`;

      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: `Oggetto: ${subject}`,
          body: body,
          to: `<${content.email}> "${content.nome} ${content.cognome}"`,
          data: JSON.stringify(data),
        })
      ) {
        return true;
      } else {
        this.notifyStore.setNotify({
          message: "L'invio della posta non è riuscito",
          type: "negative",
          position: "top",
        });
        return false;
      }
    },
    onReset() {
      this.formContact = {
        id: 0,
        nome: "",
        cognome: "",
        email: "",
        phone: "",
        message: "",
        class: "",
      };
    },
  },
  async mounted() {
    const pollService = new PollService();
    this.pollConfig = await pollService.getPollConfig();
  },
});