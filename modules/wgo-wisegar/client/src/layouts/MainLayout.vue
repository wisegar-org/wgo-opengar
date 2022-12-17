<template>
  <MainLayout
    :tranStore="tranStore"
    :authStore="authStore"
    :langStore="langStore"
    :routeService="routeService"
    :homePath="homePath"
    maxWidtg="1400px"
    :menuItems="menuItems"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useTranslationStore } from "../stores/translationStore";
import MainLayout from "@wisegar-org/wgo-base-client/build/core/components/Layouts/MainLayout.vue";
import { useRouter } from "vue-router";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import { useLanguageStore } from "../stores/languageStore";
import { AuthStore } from "@wisegar-org/wgo-base-client/build/authentication/store/AuthStore";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { LanguageStore } from "@wisegar-org/wgo-base-client/build/language/store/LanguageStore";
import { Paths } from "../router/paths";
import { MenuListItem } from "@wisegar-org/wgo-base-models";

export default defineComponent({
  components: {
    MainLayout,
  },
  props: {
    menuItems: {
      type: Array as PropType<MenuListItem[]>,
      default: [],
    },
  },
  data() {
    const router = useRouter();
    return {
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
      homePath: Paths.home.path,
    };
  },
});
</script>
