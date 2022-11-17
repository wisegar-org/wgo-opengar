import { openURL } from "quasar";
import { UtilService } from "src/services/UtilService";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/wgo-base/build/core/components/BaseComponents";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BannerComponent",
  props: {
    text: { type: String, default: "" },
    button: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  setup(props, ctx) {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      getLabel: (name: string) =>
        getLabel(tranStore.translationStore as any, name),
    };
  },
  methods: {
    openPage(event: Event) {
      if (this.url) UtilService.openNewTab(event, this.url);
    },
  },
});
