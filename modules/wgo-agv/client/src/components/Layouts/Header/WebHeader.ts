import { useAuthStore } from "src/stores/authStore";
import { defineComponent, PropType } from "vue";
import {
  AdminBasePath,
  IRoute,
  translations as transBase,
} from "src/wgo-base/models/core";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/wgo-base/client/core/components/BaseComponents";
import { UtilService } from "src/services/UtilService";
import { SUPERADMIN } from "src/wgo-base/models/authentication";

export default defineComponent({
  name: "WebHeader",
  props: {
    title: { type: String, default: "" },
    menuList: { type: Array as PropType<IRoute[]>, default: [] },
  },
  setup(props, ctx) {
    const authStore = useAuthStore();
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      authStore,
      adminPath: AdminBasePath,
      getLabel: (name: string) =>
        getLabel(tranStore.translationStore as any, name),
      transBase,
    };
  },
  methods: {
    goToHome() {
      if (this.$route.path !== "/") {
        void this.$router.push("/");
      }
    },
    isUserAdmin() {
      return this.authStore.authStore.isUserInRole([SUPERADMIN]);
    },
    openNewTab(evt: Event) {
      UtilService.openNewTab(evt, this.adminPath);
    },
  },
});
