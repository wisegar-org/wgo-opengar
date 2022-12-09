<template>
  <ResetPasswordComponent
    @onHome="goToHome"
    :tranStore="tranStore"
    @onReset="goToEmailSended"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ResetPasswordComponent from "../../wgo-base/client/authentication/components/ResetPasswordComponent.vue";
import { Paths } from "../../router/paths";
import { useTranslationStore } from "../../stores/translationStore";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "../../wgo-base/client/core/components/BaseComponents";
import { RouteService } from "../../wgo-base/client/core/services/RouteService";
import { TranslationStore } from "../../wgo-base/client/translation/store/TranslationStore";
import { AuthPaths } from "../../wgo-base/models/authentication/router";

export default defineComponent({
  name: "RegisterResetPasswordPage",
  components: {
    ResetPasswordComponent,
  },
  data() {
    const router = useRouter();
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      routeService: new RouteService(router as any),
      seoComponent,
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    goToEmailSended(email: string) {
      this.routeService.goTo(AuthPaths.authEmailSended.path, {
        email,
      });
    },
    goToHome() {
      this.routeService.goTo(Paths.home.path);
    },
  },
  mounted() {
    this.seoComponent.setSeoData({
      title: "Accesso",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina di accesso.",
      },
    } as any);
  },
});
</script>
