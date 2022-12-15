<template>
  <ResetPasswordComponent @onHome="goToHome" :tranStore="tranStore" @onReset="goToEmailSended" />
</template>

<script lang="ts">
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import ResetPasswordComponent from '@wisegar-org/wgo-base-client/build/authentication/components/ResetPasswordComponent.vue';
import { Paths } from '../../router/paths';
import { AuthPaths } from '@wisegar-org/wgo-base-models';
import { useTranslationStore } from '../../stores/translationStore';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';

export default defineComponent({
  name: 'RegisterResetPasswordPage',
  components: {
    ResetPasswordComponent,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    goToEmailSended(email: string) {
      this.routeService.goTo(AuthPaths.authEmailSended.path, {
        email,
      });
    },
    goToHome() {
      this.routeService.goTo(Paths.home.path);
    },
  },
});
</script>
