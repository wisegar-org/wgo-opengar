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
import LoginComponent from "../../wgo-base/authentication/components/LoginComponent.vue";
import { ISuccesLogin } from "../../wgo-base/authentication/models";
import { RouteService } from "../../wgo-base/core/services/RouteService";
import { useRouter } from "vue-router";
import { AuthPaths } from "../../wgo-base/authentication/router";
import { useAuthStore } from "../../stores/authStore";
import { Paths } from "../../router/paths";
import { useTranslationStore } from "../../stores/translationStore";
import { TranslationStore } from "../../wgo-base/translation/models/TranslationStore";
import { BaseSeoDataComponent } from "../../../../src/wgo-base/core/components/BaseComponents";
import { useMeta } from "quasar";

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
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      routeService: new RouteService(router as any),
      seoComponent,
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
