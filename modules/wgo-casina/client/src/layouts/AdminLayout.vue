<template>
  <AdminMainLayout
    :tranStore="tranStore"
    :authStore="authStore"
    :menuItems="menuItems"
    :langStore="langStore"
    :routeService="routeService"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useTranslationStore } from '../stores/translationStore';
import AdminMainLayout from '../wgo-base/core/components/Layouts/AdminMainLayout.vue';
import { menuItems } from '../settings/navigation';
import { useRouter } from 'vue-router';
import { RouteService } from '../wgo-base/core/services/RouteService';
import { useLanguageStore } from '../stores/languageStore';

export default defineComponent({
  components: {
    AdminMainLayout,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
    };
  },
  setup() {
    const authStore = useAuthStore();
    const transStore = useTranslationStore();
    const langStore = useLanguageStore();

    return {
      authStore: authStore.authStore,
      tranStore: transStore.translationStore,
      langStore: langStore.languageStore,
      menuItems,
    };
  },
});
</script>
