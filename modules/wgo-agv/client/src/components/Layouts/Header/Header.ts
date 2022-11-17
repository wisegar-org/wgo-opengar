import { defineComponent } from "vue";
import MobileHeader from "./MobileHeader.vue";
import WebHeader from "./WebHeader.vue";
import { translations as transBase } from "src/wgo-base/core/models/translations";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/wgo-base/core/components/BaseComponents";
import { AGVPaths } from "src/router/paths/sitePaths";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    WebHeader,
    MobileHeader,
  },
  setup(props, ctx) {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      getLabel: (name: string) =>
        getLabel(tranStore.translationStore as any, name),
      transBase,
      paths: Object.values(AGVPaths),
    };
  },
});
