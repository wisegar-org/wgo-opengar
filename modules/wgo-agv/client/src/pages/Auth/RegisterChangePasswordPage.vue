<template>
  <div>
    <ChangePasswordComponent
      v-if="!!token"
      :tranStore="tranStore"
      :token="token"
      @onChangePassword="onEmailConfirm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChangePasswordComponent from "@wisegar-org/wgo-base-client/build/authentication/components/ChangePasswordComponent.vue";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import { useTranslationStore } from "../../stores/translationStore";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";

export default defineComponent({
  name: "RegisterChangePasswordPage",
  components: { ChangePasswordComponent },
  data() {
    const route = useRoute();
    const router = useRouter();
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      routeService: new RouteService(router as any),
      token: (route.query.token as string) || "",
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
    onEmailConfirm() {
      this.routeService.goTo(AuthPaths.authLogin.path);
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
