<template>
  <div>
    <ConfirmEmailComponent v-if="!!token" :tranStore="tranStore" :token="token" @onConfirm="onEmailConfirm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IUser } from '../../../../../wgo-base/core/models';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import ConfirmEmailComponent from '../../../../../wgo-base/authentication/components/ConfirmEmailComponent.vue';
import { AuthPaths } from '../../../../../wgo-base/authentication/router';
import { useTranslationStore } from '../../stores/translationStore';
import { TranslationStore } from '../../../../../wgo-base/translation/models/TranslationStore';

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
