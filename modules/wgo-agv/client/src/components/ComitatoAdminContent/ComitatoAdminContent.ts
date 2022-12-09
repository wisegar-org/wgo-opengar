import { useAppContentStore } from "src/stores/appContentStore";
import { defineComponent } from "vue";
import { translations } from "src/models/translations/content";
import { useTranslationStore } from "src/stores/translationStore";
import { useNotifyStore } from "src/stores/notifyStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import Editor from "src/wgo-base/client/core/components/Editor/Editor.vue";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/wgo-base/client/core/components/BaseComponents";
import { translations as transBase } from "src/wgo-base/models/core";
import { TranslationStore } from "src/wgo-base/client/translation/store/TranslationStore";

export default defineComponent({
  name: "ComitatoAdminContent",
  components: {
    Editor,
  },
  data() {
    const data = { content: "" };
    const { getLabel } = new BaseTranslateComponent();

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    return {
      data,
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
    const notifyStore = useNotifyStore();
    const appStatusStore = useAppStatusStore();
    const appContentStore = useAppContentStore();
    const translationStore = useTranslationStore();

    return {
      notifyStore,
      appStatusStore,
      appContentStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async onSaveData() {
      this.appStatusStore.setLoading(true);
      if (
        await this.appContentStore.savePageContent({
          ...this.appContentStore.contentObj,
          comitatoMembri: this.data.content,
        })
      ) {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SAVE_COMITATO_SUCCESS),
          position: "top",
          type: "positive",
        });
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SAVE_COMITATO_FAIL),
          position: "top",
          type: "negative",
        });
      }
      this.appStatusStore.setLoading(false);
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    if (!this.appContentStore.contentObj.comitatoMembri) {
      await this.appContentStore.loadPageContent();
    }

    this.data.content = this.appContentStore.contentObj.comitatoMembri || "";
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});
