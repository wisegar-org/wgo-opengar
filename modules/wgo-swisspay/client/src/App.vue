<template>
  <router-view v-if="!loading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNotifyStore } from './stores/notifyStore';
import { QNotifyCreateOptions, useQuasar } from 'quasar';
import { AuthService } from '../../../wgo-base/authenticacion/services/AuthService';
import { useAuthStore } from './stores/authStore';
import { USER_AUTH_TOKEN } from '../../../wgo-base/authenticacion/models';
import HelloWorld from '../../../wgo-base-lib/src/components/HelloWorld.vue';
import LoginDialog from './components/LoginDialog/LoginDialog.vue';

export default defineComponent({
  components: { LoginDialog, HelloWorld },
  name: 'App',
  data() {
    return { loading: true };
  },
  setup() {
    const notifyStore = useNotifyStore();
    const quasar = useQuasar();
    notifyStore.$subscribe((mutation, state) => {
      quasar.notify(state.notify as QNotifyCreateOptions);
    });
    const $q = useQuasar();
    const authStore = useAuthStore();
    authStore.$subscribe((mutation, state) => {
      if (authStore.getOpenLogin) {
        $q.dialog({
          component: LoginDialog,
          persistent: true,
        });
      }
    });
    const authService = new AuthService();
    const token = localStorage.getItem(USER_AUTH_TOKEN);

    return {
      token,
      authStore,
      authService,
    };
  },
  async beforeCreate() {
    if (!this.token) return;
    const user = await this.authService.me({ token: this.token || '' });
    if (!!user) {
      this.authStore.setLogin({ token: this.token, user } as any);
    }
    this.loading = false;
  },
});
</script>
