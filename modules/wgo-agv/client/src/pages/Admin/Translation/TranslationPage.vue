<template>
  <TranslationList
    :tranStore="translationStore"
    :langStore="languageStore"
    @success="success"
  />
</template>

<script lang="ts">
import { useTranslationStore } from "../../../stores/translationStore";
import { defineComponent } from "vue";
import { useNotifyStore } from "../../../stores/notifyStore";
import TranslationList from "../../../wgo-base/client/translation/components/TranslationList/TranslationList.vue";
import { useLanguageStore } from "../../../stores/languageStore";
import { TranslationStore } from "../../../wgo-base/client/translation/store/TranslationStore";
import { LanguageStore } from "../../../wgo-base/client/language/store/LanguageStore";

export default defineComponent({
  name: "TranslationPage",
  components: {
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
        position: "top",
        type: "positive",
        message: msg,
      });
    },
  },
});
</script>
