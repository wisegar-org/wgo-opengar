<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
    <LoaderVue :loading="appStatusStore.loading" />
  </router-view>
</template>

<script lang="ts">
import { QNotifyCreateOptions, useQuasar } from "quasar";
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStatusStore } from "./stores/appStatusStore";
import { useAuthStore } from "./stores/authStore";
import { useNotifyStore } from "./stores/notifyStore";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { AuthService } from "@wisegar-org/wgo-base-client/build/authentication/services/AuthService";
import LoaderVue from "@wisegar-org/wgo-base-client/build/core/components/Loader/Loader.vue";
import { useLanguageStore } from "./stores/languageStore";
import { useTranslationStore } from "./stores/translationStore";

export default defineComponent({
  name: "App",
  components: {
    LoaderVue,
  },
  setup() {
    const $q = useQuasar();

    //NOTIFY STORE
    const notifyStore = useNotifyStore();
    watch(notifyStore.getNotify, () => {
      $q.notify(notifyStore.notify as QNotifyCreateOptions);
    });

    //AUTH STORE
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    watch(authStore.authStore, () => {
      if (authStore.openAuthDialog()) {
        router.push({
          path: AuthPaths.authLogin.path,
          query: {
            path: route.fullPath,
          },
        });
      }
    });

    const authService = new AuthService();
    const appStatusStore = useAppStatusStore();
    const langStore = useLanguageStore();
    const translationStore = useTranslationStore();
    return {
      authStore: authStore.authStore,
      authService,
      appStatusStore,
      token: ref(authStore.authStore.token),
      langStore,
      translationStore,
    };
  },
});
</script>
