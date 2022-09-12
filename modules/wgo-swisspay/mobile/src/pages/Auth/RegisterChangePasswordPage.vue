<template>
  <div>
    <ChangePasswordComponent v-if="!!token" :tranStore="tranStore" :token="token" @onChangePassword="onEmailConfirm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IUser } from '../../wgo-base/core/models';
import { RouteService } from '../../wgo-base/core/services/RouteService';
import ChangePasswordComponent from '../../wgo-base/authentication/components/ChangePasswordComponent.vue';
import { AuthPaths } from '../../wgo-base/authentication/router';
import { useTranslationStore } from '../../stores/translationStore';
import { TranslationStore } from '../../wgo-base/translation/models/TranslationStore';

export default defineComponent({
  name: 'RegisterChangePasswordPage',
  components: { ChangePasswordComponent },
  data() {
    const route = useRoute();
    const router = useRouter();
    return {
      routeService: new RouteService(router as any),
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
    onEmailConfirm() {
      this.routeService.goTo(AuthPaths.authLogin.path);
    },
  },
});
</script>
