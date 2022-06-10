<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNotifyStore, INotify } from "./stores/notifyStore";
import { QNotifyCreateOptions, useQuasar } from "quasar";
import { AuthService } from "../../../wgo-base/authenticacion/services/AuthService";
import { useAuthStore } from "./stores/authStore";
import { USER_AUTH_TOKEN } from "../../../wgo-base/authenticacion/models";
import HelloWorld from "../../../wgo-base-lib/src/components/HelloWorld.vue";

export default defineComponent({
  components: { HelloWorld },
  name: "App",
  setup() {
    const notifyStore = useNotifyStore();
    const quasar = useQuasar();
    notifyStore.$subscribe((mutation, state) => {
      quasar.notify(state.notify as QNotifyCreateOptions);
    });
    const authStore = useAuthStore();
    const authService = new AuthService();
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    if (!!token) {
      authService.me({ token }).then((user) => {
        if (!!user) authStore.setLogin({ token, user } as any);
      });
    }
  },
});
</script>
