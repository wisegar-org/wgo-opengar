<template>
  <AdminMainLayout
    :tranStore="tranStore"
    :authStore="authStore"
    :menuItems="menuItems"
    :langStore="langStore"
    :routeService="routeService"
    :homePath="homePath"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useTranslationStore } from '../stores/translationStore';
import AdminMainLayout from '@wisegar-org/wgo-base-client/build/core/components/Layouts/AdminMainLayout.vue';
import { menuItems } from '../settings/navigation';
import { useRouter } from 'vue-router';
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import { useLanguageStore } from '../stores/languageStore';
import { AuthStore } from '@wisegar-org/wgo-base-client/build/authentication/store/AuthStore';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { LanguageStore } from '@wisegar-org/wgo-base-client/build/language/store/LanguageStore';
import { Paths } from '../router/paths';

export default defineComponent({
  components: {
    AdminMainLayout,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router) as any,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const transStore = useTranslationStore();
    const langStore = useLanguageStore();

    return {
      authStore: authStore.authStore as AuthStore,
      tranStore: transStore.translationStore as TranslationStore,
      langStore: langStore.languageStore as LanguageStore,
      menuItems,
      homePath: Paths.home.path,
    };
  },
});
</script>
