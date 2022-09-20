<template>
  <MainLayout
    :tranStore="tranStore"
    :authStore="authStore"
    :menuItems="menuItems"
    :langStore="langStore"
    :routeService="routeService"
    :homePath="homePath"
    :title="title"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useTranslationStore } from "../../stores/translationStore";
import MainLayout from "../../wgo-base/core/components/Layouts/MainLayout.vue";
import { financeMenuItems as menuItems } from "../../settings/navigation";
import { useRouter } from "vue-router";
import { RouteService } from "../../wgo-base/core/services/RouteService";
import { useLanguageStore } from "../../stores/languageStore";
import { AuthStore } from "../../wgo-base/authentication/models/AuthStore";
import { TranslationStore } from "../../wgo-base/translation/models/TranslationStore";
import { LanguageStore } from "../../wgo-base/language/models/LanguageStore";
import { Paths } from "../../router/paths";
import { translations as tranBase } from "../../wgo-base/core/models";

export default defineComponent({
  components: {
    MainLayout,
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
    const title = tranBase.APP_TITLE;

    return {
      title,
      authStore: authStore.authStore as AuthStore,
      tranStore: transStore.translationStore as TranslationStore,
      langStore: langStore.languageStore as LanguageStore,
      menuItems,
      homePath: Paths.home.path,
    };
  },
});
</script>
