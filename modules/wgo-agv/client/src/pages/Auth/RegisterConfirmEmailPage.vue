<template>
  <div>
    <ConfirmEmailComponent
      v-if="!!token"
      :tranStore="tranStore"
      :token="token"
      @onConfirm="onEmailConfirm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import ConfirmEmailComponent from "@wisegar-org/wgo-base-client/build/authentication/components/ConfirmEmailComponent.vue";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { useTranslationStore } from "../../stores/translationStore";
import { useMeta } from "quasar";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";

export default defineComponent({
  name: "RegisterConfirmEmailPage",
  components: { ConfirmEmailComponent },
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
    onEmailConfirm(confirmed: boolean) {
      if (confirmed) {
        this.routeService.goTo(AuthPaths.authLogin.path);
      } else {
        this.routeService.goTo(AuthPaths.authResendConfirmation.path);
      }
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
