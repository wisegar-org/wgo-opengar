import { defineComponent } from "vue";
import MobileHeader from "./MobileHeader.vue";
import WebHeader from "./WebHeader.vue";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { AGVPaths } from "src/router/paths/sitePaths";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    WebHeader,
    MobileHeader,
  },
  setup() {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      getLabel: (name: string) =>
        getLabel(
          tranStore.translationStore as unknown as TranslationStore,
          name
        ),
      transBase,
      paths: Object.values(AGVPaths),
    };
  },
});
