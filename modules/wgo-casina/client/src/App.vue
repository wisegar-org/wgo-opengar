<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
    <Loader :loading="appStatusStore.loading" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNotifyStore } from './stores/notifyStore';
import { QNotifyCreateOptions, useQuasar } from 'quasar';
import Loader from './wgo-base/core/components/Loader/Loader.vue';
import { useAppStatusStore } from './stores/appStatusStore';

export default defineComponent({
  name: 'App',
  components: { Loader },
  setup() {
    const $q = useQuasar();

    //NOTIFY STORE
    const notifyStore = useNotifyStore();
    notifyStore.$subscribe((mutation, state) => {
      $q.notify(state.notify as QNotifyCreateOptions);
    });

    const appStatusStore = useAppStatusStore();

    return {
      appStatusStore,
    };
  },
});
</script>
