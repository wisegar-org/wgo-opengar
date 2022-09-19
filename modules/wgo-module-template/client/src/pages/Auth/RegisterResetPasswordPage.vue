<template>
  <ResetPasswordComponent
    @onHome="goToHome"
    :tranStore="tranStore"
    @onReset="goToEmailSended"
  />
</template>

<script lang="ts">
import { RouteService } from "../../wgo-base/core/services/RouteService";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ResetPasswordComponent from "../../wgo-base/authentication/components/ResetPasswordComponent.vue";
import { Paths } from "../../router/paths";
import { AuthPaths } from "../../wgo-base/authentication/router";
import { useTranslationStore } from "../../stores/translationStore";
import { TranslationStore } from "../../wgo-base/translation/models/TranslationStore";

export default defineComponent({
  name: "RegisterResetPasswordPage",
  components: {
    ResetPasswordComponent,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router as any),
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
});
</script>
