<template>
  <div>
    <EmailSendedComponent v-if="!!email" :tranStore="tranStore" :email="email" @onHome="goToHome" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EmailSendedComponent from '../../wgo-base/authentication/components/EmailSendedComponent.vue';
import { RouteService } from '../../wgo-base/core/services/RouteService';
import { Paths } from '../../router/paths';
import { useTranslationStore } from '../../stores/translationStore';
import { TranslationStore } from '../../wgo-base/translation/models/TranslationStore';

export default defineComponent({
  name: 'RegisterEmailSendedPage',
  components: {
    EmailSendedComponent,
  },
  data() {
    const route = useRoute();
    const router = useRouter();
    return {
      email: (route.query.email as string) || '',
      routeService: new RouteService(router as any),
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    goToHome() {
      this.routeService.goTo(Paths.home.path);
    },
  },
});
</script>
