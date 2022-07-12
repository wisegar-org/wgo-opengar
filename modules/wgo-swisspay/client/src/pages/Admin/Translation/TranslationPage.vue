<template>
  <TranslationList :tranStore="translationStore" :langStore="languageStore" @success="success" />
</template>

<script lang="ts">
import { useTranslationStore } from '../../../stores/translationStore';
import { defineComponent } from 'vue';
import LanguageList from '../../../../../../wgo-base/language/components/LanguageList/LanguageList.vue';
import { useNotifyStore } from '../../../stores/notifyStore';
import TranslationList from '../../../../../../wgo-base/translation/components/TranslationList/TranslationList.vue';
import { useLanguageStore } from '../../../stores/languageStore';
import { LanguageStore } from '../../../../../../wgo-base/language/models/LanguageStore';
import { TranslationStore } from '../../../../../../wgo-base/translation/models/TranslationStore';

export default defineComponent({
  name: 'TranslationPage',
  components: {
    LanguageList,
    TranslationList,
  },
  setup() {
    const translationStore = useTranslationStore();
    const languageStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    return {
      translationStore: translationStore.translationStore as TranslationStore,
      languageStore: languageStore.languageStore as LanguageStore,
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
