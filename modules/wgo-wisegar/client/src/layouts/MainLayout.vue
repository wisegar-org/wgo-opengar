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
import MainLayout from "../wgo-base/core/components/Layouts/MainLayout.vue";
import { useRouter } from "vue-router";
import { RouteService } from "../wgo-base/core/services/RouteService";
import { useLanguageStore } from "../stores/languageStore";
import { AuthStore } from "../wgo-base/authentication/models/AuthStore";
import { TranslationStore } from "../wgo-base/translation/models/TranslationStore";
import { LanguageStore } from "../wgo-base/language/models/LanguageStore";
import { Paths } from "../router/paths";
import { MenuListItem } from "../wgo-base/core/models/Menu";

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
