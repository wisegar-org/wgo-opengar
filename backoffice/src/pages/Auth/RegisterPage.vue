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
import { Router, useRouter } from "vue-router";
import { defineComponent } from "vue";
import RegisterComponent from "@wisegar-org/wgo-base-client/build/authentication/components/RegisterComponent.vue";
import { Paths } from "../../router/paths";
import { useTranslationStore } from "../../stores/translationStore";
import { USER_ROLE } from "../../../../src/models/constants";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { IUser } from "@wisegar-org/wgo-base-models/build/core";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";

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
      routeService: new RouteService(router as Router),
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
    } as unknown as ISeoModel);
  },
});
</script>
