<template>
  <ResetPasswordComponent @onHome="goToHome" @onReset="goToEmailSended" />
</template>

<script lang="ts">
import { RouteService } from "../../../../../wgo-base/core/services/RouteService";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ResetPasswordComponent from "../../../../../wgo-base/authenticacion/components/ResetPasswordComponent.vue";
import { Paths } from "../../router/paths";
import { AuthPaths } from "../../../../../wgo-base/authenticacion/router";
export default defineComponent({
  name: "RegisterResetPasswordPage",
  components: {
    ResetPasswordComponent,
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
