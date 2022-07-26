<template>
  <EmailMediaList :tranStore="tranStore" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TranslationStore } from '../../wgo-base/translation/models/TranslationStore';
import EmailMediaList from '../../components/EmailMedia/EmailMediaList.vue';
import { useTranslationStore } from '../../stores/translationStore';

export default defineComponent({
  name: 'EmailMediaPage',
  components: {
    EmailMediaList,
  },
  setup() {
    const tranStore = useTranslationStore();

    return {
      tranStore: tranStore.translationStore as TranslationStore,
    };
  },
});
</script>
