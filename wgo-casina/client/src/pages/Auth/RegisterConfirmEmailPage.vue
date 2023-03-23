<template>
  <div>
    <ConfirmEmailComponent v-if="!!token" :tranStore="tranStore" :token="token" @onConfirm="onEmailConfirm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import ConfirmEmailComponent from '@wisegar-org/wgo-base-client/build/authentication/components/ConfirmEmailComponent.vue';
import { AuthPaths } from '@wisegar-org/wgo-base-models/build/authentication';
import { useTranslationStore } from '../../stores/translationStore';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';

export default defineComponent({
  name: 'RegisterConfirmEmailPage',
  components: { ConfirmEmailComponent },
  data() {
    const route = useRoute();
    const router = useRouter();
    return {
      routeService: new RouteService(router),
      token: (route.query.token as string) || '',
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    onEmailConfirm(confirmed: boolean) {
      if (confirmed) {
        this.routeService.goTo(AuthPaths.authLogin.path);
      } else {
        this.routeService.goTo(AuthPaths.authResendConfirmation.path);
      }
    },
  },
});
</script>
