<template>
  <LoginComponent
    :tranStore="tranStore"
    @onLogin="onLogin"
    @onRegister="goToRegister"
    @onHome="goToHome"
    @onResetPassword="goToResetPassword"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "@wisegar-org/wgo-base-client/build/authentication/components/LoginComponent.vue";
import { ISuccesLogin } from "@wisegar-org/wgo-base-models";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import { useRouter } from "vue-router";
import { AuthPaths } from "@wisegar-org/wgo-base-models";
import { useAuthStore } from "../../stores/authStore";
import { Paths } from "../../router/paths";
import { useTranslationStore } from "../../stores/translationStore";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";

export default defineComponent({
  name: "LoginPage",
  components: {
    LoginComponent,
  },
  props: {
    path: String,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router as any),
    };
  },
  setup() {
    const authStore = useAuthStore();
    const translationStore = useTranslationStore();
    return {
      authStore: authStore.authStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    onLogin(value: ISuccesLogin) {
      console.log("Component login result");
      console.log(value);
      this.authStore.setLogin(value);
      this.routeService.goTo(this.path || Paths.home.path);
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
