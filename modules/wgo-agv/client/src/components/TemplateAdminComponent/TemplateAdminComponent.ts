import { useAppStatusStore } from "src/stores/appStatusStore";
import { useAuthStore } from "src/stores/authStore";
import { useNotifyStore } from "src/stores/notifyStore";
import { useTranslationStore } from "src/stores/translationStore";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/wgo-base/core/components/BaseComponents";
import { EmailService } from "src/wgo-base/email/services/EmailService";
import { TemplateResponse } from "src/wgo-base/template/resolvers/TemplateResponses";
import { TemplateService } from "src/wgo-base/template/services/TemplateService";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import { defineComponent, PropType, watch } from "vue";
import QCKEditor from "src/wgo-base/core/components/CKEditor/QCKEditor.vue";
import { translations } from "src/models/translations/template";
import { translations as transBase } from "src/wgo-base/core/models";
import { apiSettings } from "src/api/ApiOptions";

export default defineComponent({
  name: "TemplateAdminComponent",
  props: {
    type: { type: String, default: "" },
    objectToken: { type: Array as PropType<string[]>, default: [] },
    testData: { type: Object as PropType<any>, default: {} },
  },
  components: {
    QCKEditor,
  },
  data(vm) {
    const template: TemplateResponse = {
      id: 0,
      body: "",
      documentType: "",
      title: "",
    };
    const { getLabel } = new BaseTranslateComponent();
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    return {
      urlApi: apiSettings.API_BASE,
      template,
      transBase,
      translations,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
    };
  },
  setup(props, ctx) {
    const appStatusStore = useAppStatusStore();
    const notifyStore = useNotifyStore();
    const translationStore = useTranslationStore();
    const authStore = useAuthStore();
    return {
      authStore,
      appStatusStore,
      notifyStore,
      templateService: new TemplateService(),
      emailService: new EmailService(),
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async loadTemplate() {
      if (this.type) {
        this.appStatusStore.setLoading(true);
        const template = await this.templateService.getTemplateByType(
          this.type
        );
        this.appStatusStore.setLoading(false);
        if (template) {
          this.template = {
            id: template.id,
            body: template.body,
            title: template.title,
            documentType: template.documentType,
          };
          return;
        }
      }
      this.template = {
        id: 0,
        body: "",
        documentType: "",
        title: "",
      };
    },
    async onSave() {
      if (await this.templateService.setTemplate(this.template)) {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SAVE_SUCCESS),
          type: "positive",
          position: "top",
        });
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SAVE_FAIL),
          type: "negative",
          position: "top",
        });
      }
    },
    async sendTest() {
      this.appStatusStore.setLoading(true);
      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: `Prova: ${this.getLabel(this.getTranslationKey())}`,
          body: this.template.body,
          to: `<${this.authStore.getUser?.email}> "${this.authStore.getUser?.name} ${this.authStore.getUser?.lastName}"`,
          data: JSON.stringify(this.testData),
        })
      ) {
        this.appStatusStore.setLoading(false);
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SEND_SUCCESS),
          type: "positive",
          position: "top",
        });
        return true;
      } else {
        this.appStatusStore.setLoading(false);
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SEND_FAIL),
          type: "negative",
          position: "top",
        });
        return false;
      }
    },
    getTranslationKey() {
      return this.type ? `WGO_${this.type}_TITLE` : "";
    },
    writeToken(text: string) {
      const model = (this.$refs.editor as any).$refs.editor.instance.model;

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
  watch: {
    type(): void {
      this.loadTemplate();
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.loadTemplate();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});