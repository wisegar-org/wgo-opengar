import { UtilService } from "src/services/UtilService";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { defineComponent } from "vue";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";

export default defineComponent({
  name: "BannerComponent",
  props: {
    text: { type: String, default: "" },
    button: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  setup() {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      getLabel: (name: string) =>
        getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    openPage(event: Event) {
      if (this.url) UtilService.openNewTab(event, this.url);
    },
  },
});
