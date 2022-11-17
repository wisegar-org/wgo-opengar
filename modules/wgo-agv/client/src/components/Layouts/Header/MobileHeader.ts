import { useAuthStore } from "src/stores/authStore";
import { useLanguageStore } from "src/stores/languageStore";
import { useTranslationStore } from "src/stores/translationStore";
import { AuthStore } from "src/wgo-base/authentication/models/AuthStore";
import { RouteService } from "src/wgo-base/core/services/RouteService";
import { LanguageStore } from "src/wgo-base/language/models/LanguageStore";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { IRoute } from "src/wgo-base/core/models";
import { IMenuItem } from "src/wgo-base/core/models/Menu";

export default defineComponent({
  name: "MobileHeader",
  props: {
    title: { type: String, default: "" },
    menuList: { type: Array as PropType<IRoute[]>, default: [] },
  },
  data(vm) {
    const router = useRouter();
    return {
      menuItems: this.menuList.map(
        (item, index) =>
          ({
            color: "black",
            icon: "",
            id: `${index}-menu-${item.name}`,
            label: item.label,
            link: item.path,
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
  },
});
