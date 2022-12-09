<template>
  <RegisterComponent
    @goBack="onGoBack"
    :tranStore="tranStore"
    :roles="roles"
    @onRegister="onRegister"
    @onHome="onGoHome"
  />
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import RegisterComponent from "../../wgo-base/client/authentication/components/RegisterComponent.vue";
import { Paths } from "../../router/paths";
import { useTranslationStore } from "../../stores/translationStore";
import { USER_ROLE } from "../../../../src/models/constants";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "../../wgo-base/client/core/components/BaseComponents";
import { RouteService } from "../../wgo-base/client/core/services/RouteService";
import { TranslationStore } from "../../wgo-base/client/translation/store/TranslationStore";
import { IUser } from "../../wgo-base/models/core";
import { AuthPaths } from "../../wgo-base/models/authentication/router";

export default defineComponent({
  name: "RegisterPage",
  components: {
    RegisterComponent,
  },
  data() {
    const router = useRouter();
    const roles = [USER_ROLE];
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      roles,
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
