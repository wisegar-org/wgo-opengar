import { IPageContent } from "src/models/Content";
import { UtilService } from "src/services/UtilService";
import { useAppContentStore } from "src/stores/appContentStore";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SocialMedia",
  data(vm) {
    return {
      content: {
        facebook: "",
        instagram: "",
      } as IPageContent,
    };
  },
  setup(props, ctx) {
    const contentStore = useAppContentStore();
    return {
      contentStore,
    };
  },
  methods: {
    goToLink(event: Event, link: string) {
      UtilService.openNewTab(event, link);
    },
  },
  async created() {
    debugger;
    if (
      !this.contentStore.content ||
      !this.contentStore.content.facebook ||
      !this.contentStore.content.instagram
    ) {
      await this.contentStore.loadPageContent();
      this.content = this.contentStore.contentObj;
    }
  },
});
