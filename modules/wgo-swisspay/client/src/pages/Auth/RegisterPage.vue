<template>
  <RegisterComponent
    @goBack="onGoBack"
    @onRegister="onRegister"
    @onHome="onGoHome"
  />
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import RegisterComponent from "../../../../../wgo-base/authenticacion/components/RegisterComponent.vue";
import { RouteService } from "../../../../../wgo-base/core/services/RouteService";
import { IUser } from "../../../../../wgo-base/core/models/user";
import { AuthPaths } from "../../../../../wgo-base/authenticacion/router";
import { Paths } from "../../router/routes";

export default defineComponent({
  name: "RegisterPage",
  components: {
    RegisterComponent,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
    };
  },
  methods: {
    onGoHome() {
      this.routeService.goTo(Paths.home.path);
    },
    onGoBack() {
      this.routeService.goBack();
    },
    onRegister(user: IUser) {
      this.routeService.goTo(AuthPaths.authEmailSended.path, {
        email: user.email,
      });
    },
  },
});
</script>
