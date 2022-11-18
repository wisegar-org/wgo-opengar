import { openURL } from "quasar";
import { useAuthStore } from "src/stores/authStore";
import { SUPERADMIN } from "src/wgo-base/authentication/models/constants";
import { AdminBasePath } from "src/wgo-base/core/router";
import { IRoute } from "src/wgo-base/core/models";
import { defineComponent, PropType } from "vue";
import { translations as transBase } from "src/wgo-base/core/models/translations";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/wgo-base/core/components/BaseComponents";
import { UtilService } from "src/services/UtilService";

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
