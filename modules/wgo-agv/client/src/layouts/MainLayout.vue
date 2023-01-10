<template>
  <AdminMainLayout
    :tranStore="tranStore"
    :authStore="authStore"
    :menuItems="menuItems"
    :langStore="langStore.languageStore"
    :routeService="routeService"
    :homePath="homePath"
    :title="title"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useTranslationStore } from "../stores/translationStore";
import AdminMainLayout from "@wisegar-org/wgo-base-client/build/core/components/Layouts/AdminMainLayout.vue";
import { menuItems } from "../settings/navigation";
import { Router, useRouter } from "vue-router";
import { useLanguageStore } from "../stores/languageStore";
import { Paths } from "../router/paths";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import {
  ISeoModel,
  translations as tranBase,
} from "@wisegar-org/wgo-base-models/build/core";
import { AuthStore } from "@wisegar-org/wgo-base-client/build/authentication/store/AuthStore";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
// import { LanguageStore } from "@wisegar-org/wgo-base-client/build/language/store/LanguageStore";

export default defineComponent({
  components: {
    AdminMainLayout,
  },
  data() {
    const router = useRouter();

    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      routeService: new RouteService(router as Router),
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
      langStore: langStore,
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
    } as unknown as ISeoModel);
  },
});
</script>
