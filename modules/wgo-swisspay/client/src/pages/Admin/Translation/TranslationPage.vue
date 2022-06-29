<template>
  <TranslationList :tranStore="translationStore" :langStore="languageStore" @onSet="onSet" />
</template>

<script lang="ts">
import { useTranslationStore } from '../../../stores/translationStore';
import { defineComponent } from 'vue';
import LanguageList from '../../../../../../wgo-base/language/components/LanguageList/LanguageList.vue';
import { useNotifyStore } from '../../../stores/notifyStore';
import TranslationList from '../../../../../../wgo-base/translation/components/TranslationList/TranslationList.vue';
import { useLanguageStore } from '../../../stores/languageStore';

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
      translationStore: translationStore.translationStore,
      languageStore: languageStore.languageStore,
      notifyStore,
    };
  },
  methods: {
    onSet() {
      this.notifyStore.setNotify({
        position: 'top',
        type: 'positive',
        message: 'Translation seted successfuly',
      });
    },
  },
});
</script>
