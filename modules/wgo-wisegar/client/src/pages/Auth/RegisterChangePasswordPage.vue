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
import { IUser } from "@wisegar-org/wgo-base-models";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import ChangePasswordComponent from "@wisegar-org/wgo-base-client/build/authentication/components/ChangePasswordComponent.vue";
import { AuthPaths } from "@wisegar-org/wgo-base-models";
import { useTranslationStore } from "../../stores/translationStore";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";

export default defineComponent({
  name: "RegisterChangePasswordPage",
  components: { ChangePasswordComponent },
  data() {
    const route = useRoute();
    const router = useRouter();
    return {
      routeService: new RouteService(router as any),
      token: (route.query.token as string) || "",
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
});
</script>
