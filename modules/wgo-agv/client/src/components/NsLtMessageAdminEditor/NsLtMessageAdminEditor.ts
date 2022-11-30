import { AgvNewsletterMessageResponse } from "app/../src/models/Newsletter";
import { apiSettings } from "src/api/ApiOptions";
import { defineComponent, PropType } from "vue";
import QCKEditor from "src/wgo-base/core/components/CKEditor/QCKEditor.vue";
import { translations } from "src/models/translations/newsletter";
import { useNotifyStore } from "src/stores/notifyStore";
import { useTranslationStore } from "src/stores/translationStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/wgo-base/core/components/BaseComponents";
import { translations as transBase } from "src/wgo-base/core/models";
import { EmailService } from "src/wgo-base/email/services/EmailService";
import { useAuthStore } from "src/stores/authStore";
import { NewsletterMessageService } from "src/services/Newsletter/NwLtMessengerService";

export default defineComponent({
  name: "NsLtMessageAdminEditor",
  props: {
    message: {
      type: Object as PropType<AgvNewsletterMessageResponse>,
      required: true,
    },
  },
  components: {
    QCKEditor,
  },
  data(vm) {
    const urlApi = apiSettings.API_BASE;
    const { getLabel } = new BaseTranslateComponent();
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const objectToken: string[] = [];
    const title = this.message.id
      ? translations.MSG_EDITOR_MODIFICATION_TITLE
      : translations.MSG_EDITOR_CREATION_TITLE;

    return {
      title,
      urlApi,
      transBase,
      translations,
      objectToken,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
      emailService: new EmailService(),
      newsletterService: new NewsletterMessageService(),
    };
  },
  setup(props, ctx) {
    const notifyStore = useNotifyStore();
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();
    const authStore = useAuthStore();

    return {
      notifyStore,
      appStatusStore,
      authStore: authStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async saveMessage() {
      this.appStatusStore.setLoading(true);
      const message = {
        id: this.message.id,
        message: this.message.message,
        title: this.message.title,
        status: this.message.status || "",
      };
      const result = this.message.id
        ? await this.newsletterService.editNewsletterMessage(message)
        : await this.newsletterService.addNewsletterMessage(message);

      this.appStatusStore.setLoading(false);
      if (result) {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_EDITOR_SAVE_SUCCESS),
          type: "positive",
          position: "top",
        });
        this.$emit("success");
        //go to list page
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_EDITOR_SAVE_FAIL),
          type: "negative",
          position: "top",
        });
      }
    },
    async sendTest() {
      this.appStatusStore.setLoading(true);
      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: `Prova: ${this.message.title}`,
          body: this.message.message,
          to: `<${this.authStore.getUser?.email}> "${this.authStore.getUser?.name} ${this.authStore.getUser?.lastName}"`,
          data: JSON.stringify({
            utente: {
              email: this.authStore.getUser?.email,
            },
          }),
        })
      ) {
        this.appStatusStore.setLoading(false);
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_SEND_MESSAGE_SUCCESS),
          type: "positive",
          position: "top",
        });
        return true;
      } else {
        this.appStatusStore.setLoading(false);
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_SEND_MESSAGE_FAIL),
          type: "negative",
          position: "top",
        });
        return false;
      }
    },
    writeToken(text: string) {
      const model = (this.$refs.editor as any).$refs.editor.$_instance.model;

      model.change((writer: any) => {
        writer.insertText(
          `${text}`,
          model.document.selection.getFirstPosition()
        );
      });
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});
