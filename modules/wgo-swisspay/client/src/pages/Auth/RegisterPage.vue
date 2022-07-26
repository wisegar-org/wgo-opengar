<template>
  <RegisterComponent
    @goBack="onGoBack"
    :tranStore="tranStore"
    :roles="roles"
    @onRegister="onRegister"
    @onHome="onGoHome"
  />
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import RegisterComponent from '../../wgo-base/authentication/components/RegisterComponent.vue';
import { RouteService } from '../../wgo-base/core/services/RouteService';
import { IUser } from '../../wgo-base/core/models/user';
import { AuthPaths } from '../../wgo-base/authentication/router';
import { Paths } from '../../router/paths';
import { useTranslationStore } from '../../stores/translationStore';
import { TranslationStore } from '../../wgo-base/translation/models/TranslationStore';
import { CLIENT_ROLE } from '../../../../src/models/constants';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    RegisterComponent,
  },
  data() {
    const router = useRouter();
    const roles = [CLIENT_ROLE];
    return {
      roles,
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
    onGoHome() {
      this.routeService.goTo(Paths.home.path);
    },
    onGoBack() {
      this.routeService.goBack();
    },
    onRegister(user: IUser) {
      this.routeService.goTo(AuthPaths.authEmailSended.path, {
        email: user.email,
      });
    },
  },
});
</script>
