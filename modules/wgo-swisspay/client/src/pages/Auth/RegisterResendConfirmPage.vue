<template>
  <ResendConfirmComponent @onHome="goToHome" @onResend="goToEmailSended" />
</template>

<script lang="ts">
import { RouteService } from "../../../../../wgo-base/core/services/RouteService";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ResendConfirmComponent from "../../../../../wgo-base/authenticacion/components/ResendConfirmComponent.vue";
import { Paths } from "../../router/paths";
import { AuthPaths } from "../../../../../wgo-base/authenticacion/router";
export default defineComponent({
  name: "RegisterResendConfirmPage",
  components: {
    ResendConfirmComponent,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
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
