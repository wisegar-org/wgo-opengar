<template>
  <router-view />
</template>

<script lang="ts">
import { QNotifyCreateOptions, useQuasar } from "quasar";
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStatusStore } from "./stores/appStatusStore";
import { useAuthStore } from "./stores/authStore";
import { useNotifyStore } from "./stores/notifyStore";
import { AuthPaths } from "./wgo-base/models/authentication/router";
import { AuthService } from "./wgo-base/client/authentication/services/AuthService";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();

    //NOTIFY STORE
    const notifyStore = useNotifyStore();
    notifyStore.$subscribe((mutation, state) => {
      $q.notify(state.notify as QNotifyCreateOptions);
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

    return {
      authStore: authStore.authStore,
      authService,
      appStatusStore,
      token: ref(authStore.authStore.token),
    };
  },
});
</script>
