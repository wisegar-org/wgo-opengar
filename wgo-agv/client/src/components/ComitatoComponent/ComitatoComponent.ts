import { defineComponent } from "vue";
import TextVue from "@wisegar-org/wgo-base-client/build/core/components/Text/Text.vue";
import { useAppContentStore } from "src/stores/appContentStore";
import { IPageContent } from "src/models/Content";
import ComitatoContactForm from "../ComitatoContactForm/ComitatoContactForm.vue";

export default defineComponent({
  name: "ComitatoComponent",
  components: {
    TextVue,
    ComitatoContactForm,
  },
  data() {
    return {
      content: {
        comitatoMembri: "",
      } as IPageContent,
    };
  },
  setup() {
    const contentStore = useAppContentStore();
    return {
      contentStore,
    };
  },
  async created() {
    if (
      !this.contentStore.content ||
      !this.contentStore.content.comitatoMembri
    ) {
      await this.contentStore.loadPageContent();
      this.content = this.contentStore.contentObj;
    }
  },
});
