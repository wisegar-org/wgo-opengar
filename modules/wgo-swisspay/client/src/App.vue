<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
    <Loader :loading="appStatusStore.loading" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useNotifyStore } from './stores/notifyStore';
import { QNotifyCreateOptions, useQuasar } from 'quasar';
import { AuthService } from '../../../wgo-base/authentication/services/AuthService';
import { useAuthStore } from './stores/authStore';
import Loader from '../../../wgo-base/core/components/Loader/Loader.vue';
// import HelloWorld from '../../../wgo-base-lib/src/components/HelloWorld.vue';
import LoginDialog from './components/LoginDialog/LoginDialog.vue';
import { useAppStatusStore } from './stores/appStatusStore';

export default defineComponent({
  components: { LoginDialog, Loader },
  name: 'App',
  setup() {
    const $q = useQuasar();

    //NOTIFY STORE
    const notifyStore = useNotifyStore();
    notifyStore.$subscribe((mutation, state) => {
      $q.notify(state.notify as QNotifyCreateOptions);
    });

    //AUTH STORE
    const authStore = useAuthStore();
    watch(authStore.authStore, () => {
      if (authStore.openAuthDialog()) {
        $q.dialog({
          component: LoginDialog,
          persistent: true,
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
