<template>
  <UsersList :tranStore="translationStore" :authStore="authStore" @success="success" />
</template>

<script lang="ts">
import { useTranslationStore } from '../../../stores/translationStore';
import { defineComponent } from 'vue';
import { useNotifyStore } from '../../../stores/notifyStore';
import { TranslationStore } from '../../../../../../wgo-base/translation/models/TranslationStore';
import UsersList from '../../../../../../wgo-base/authentication/components/UsersList/UsersList.vue';
import { useAuthStore } from '../../../stores/authStore';

export default defineComponent({
  name: 'AuthUserPage',
  components: {
    UsersList,
  },
  setup() {
    const translationStore = useTranslationStore();
    const notifyStore = useNotifyStore();
    const authStore = useAuthStore();
    return {
      translationStore: translationStore.translationStore as TranslationStore,
      authStore: authStore.authStore,
      notifyStore,
    };
  },
  methods: {
    success(msg: string) {
      this.notifyStore.setNotify({
        position: 'top',
        type: 'positive',
        message: msg,
      });
    },
  },
});
</script>
