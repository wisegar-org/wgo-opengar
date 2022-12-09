<template>
  <AdminMainLayout
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
import { useAuthStore } from "../stores/authStore";
import { useTranslationStore } from "../stores/translationStore";
import AdminMainLayout from "../wgo-base/client/core/components/Layouts/AdminMainLayout.vue";
import { menuItems } from "../settings/navigation";
import { useRouter } from "vue-router";
import { useLanguageStore } from "../stores/languageStore";
import { Paths } from "../router/paths";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "../wgo-base/client/core/components/BaseComponents";
import { RouteService } from "../wgo-base/client/core/services/RouteService";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { AuthStore } from "../wgo-base/client/authentication/store/AuthStore";
import { TranslationStore } from "../wgo-base/client/translation/store/TranslationStore";
import { LanguageStore } from "../wgo-base/client/language/store/LanguageStore";

export default defineComponent({
  components: {
    AdminMainLayout,
  },
  data() {
    const router = useRouter();

    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      routeService: new RouteService(router as any) as any,
      seoComponent,
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
  mounted() {
    this.seoComponent.setSeoData({
      title: "Amministrazione",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina di amministrazione.",
      },
    } as any);
  },
});
</script>
