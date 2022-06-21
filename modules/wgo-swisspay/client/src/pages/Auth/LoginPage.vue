<template>
  <LoginComponent
    @onLogin="onLogin"
    @onRegister="goToRegister"
    @onHome="goToHome"
    @onResetPassword="goToResetPassword"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "../../../../../wgo-base/authenticacion/components/LoginComponent.vue";
import { ISuccesLogin } from "../../../../../wgo-base/authenticacion/models";
import { RouteService } from "../../../../../wgo-base/core/services/RouteService";
import { useRouter } from "vue-router";
import { AuthPaths } from "../../../../../wgo-base/authenticacion/router";
import { useAuthStore } from "../../stores/authStore";
import { Paths } from "../../router/paths";

export default defineComponent({
  name: "LoginPage",
  components: {
    LoginComponent,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
    };
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  methods: {
    onLogin(value: ISuccesLogin) {
      console.log("Component login result");
      console.log(value);
      this.authStore.setLogin(value);
      this.routeService.goTo(Paths.home.path);
    },
    goToRegister() {
      this.routeService.goTo(AuthPaths.authRegister.path);
    },
    goToHome() {
      this.routeService.goTo(Paths.home.path);
    },
    goToResetPassword() {
      this.routeService.goTo(AuthPaths.authResetPassword.path);
    },
  },
});
</script>
