<template>
  <router-view v-slot="{ Component }">
    <component v-if="!loading" :is="Component" />
    <Loader :loading="loading" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNotifyStore } from './stores/notifyStore';
import { QNotifyCreateOptions, useQuasar } from 'quasar';
import { AuthService } from '../../../wgo-base/authentication/services/AuthService';
import { useAuthStore } from './stores/authStore';
import Loader from '../../../wgo-base/core/components/Loader/Loader.vue';
// import HelloWorld from '../../../wgo-base-lib/src/components/HelloWorld.vue';
import LoginDialog from './components/LoginDialog/LoginDialog.vue';

export default defineComponent({
  components: { LoginDialog, Loader },
  name: 'App',
  setup() {
    const notifyStore = useNotifyStore();
    const quasar = useQuasar();
    notifyStore.$subscribe((mutation, state) => {
      quasar.notify(state.notify as QNotifyCreateOptions);
    });
    const $q = useQuasar();
    const authStore = useAuthStore();
    authStore.$subscribe((mutation, state) => {
      if (!state.token && state.user.id && !state.reset) {
        $q.dialog({
          component: LoginDialog,
          persistent: true,
        });
      }
    });
    const authService = new AuthService();
    const token = authStore.getAppToken();
    const loading = true;

    return {
      token,
      authStore,
      authService,
      loading,
    };
  },
  async created() {
    if (!!this.token) {
      const user = await this.authService.me({ token: this.token || '' });
      if (!!user) {
        this.authStore.setLogin({ token: this.token, user } as any);
      } else {
        this.authStore.resetState();
        location.reload();
      }
    }
    this.loading = false;
  },
});
</script>
