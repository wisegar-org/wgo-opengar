import { useAuthStore } from "src/stores/authStore";
import { useLanguageStore } from "src/stores/languageStore";
import { useTranslationStore } from "src/stores/translationStore";
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import SimpleDrawer from "src/wgo-base/client/core/components/Menu/SimpleDrawer.vue";
import { UtilService } from "src/services/UtilService";
import { AdminBasePath, IRoute } from "src/wgo-base/models/core";
import { IMenuItem } from "src/wgo-base/models/core/Menu";
import { RouteService } from "src/wgo-base/client/core/services/RouteService";
import { AuthStore } from "src/wgo-base/client/authentication/store/AuthStore";
import { TranslationStore } from "src/wgo-base/client/translation/store/TranslationStore";
import { LanguageStore } from "src/wgo-base/client/language/store/LanguageStore";

export default defineComponent({
  name: "MobileHeader",
  props: {
    title: { type: String, default: "" },
    menuList: { type: Array as PropType<IRoute[]>, default: [] },
  },
  components: {
    SimpleDrawer,
  },
  data(vm) {
    const router = useRouter();
    return {
      menuItems: this.menuList.map(
        (item, index) =>
          ({
            color: "black",
            icon: "item",
            id: `${index}-menu-${item.name}`,
            label: item.label,
            link: item.path,
            type: "item",
          } as IMenuItem)
      ),
      routeService: new RouteService(router as any) as any,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const transStore = useTranslationStore();
    const langStore = useLanguageStore();

    return {
      authStore: authStore.authStore as AuthStore,
      tranStore: transStore.translationStore as TranslationStore,
      langStore: langStore.languageStore as LanguageStore,
    };
  },
  methods: {
    goToHome() {
      if (this.$route.path !== "/") void this.$router.push("/");
    },
    goToAdmin() {
      UtilService.openNewTabUrl(AdminBasePath);
    },
  },
});
