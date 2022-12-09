<template>
  <LanguageList
    :langStore="langStore"
    :tranStore="tranStore"
    @success="onSuccess"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LanguageList from "../../../wgo-base/client/language/components/LanguageList/LanguageList.vue";
import { useLanguageStore } from "../../../stores/languageStore";
import { useNotifyStore } from "../../../stores/notifyStore";
import { useTranslationStore } from "../../../stores/translationStore";
import { LanguageStore } from "../../../wgo-base/client/language/store/LanguageStore";
import { TranslationStore } from "../../../wgo-base/client/translation/store/TranslationStore";

export default defineComponent({
  name: "LanguagePage",
  components: {
    LanguageList,
  },
  setup() {
    const languageStore = useLanguageStore();
    const translationStore = useTranslationStore();
    const notifyStore = useNotifyStore();
    return {
      langStore: languageStore.languageStore as LanguageStore,
      tranStore: translationStore.translationStore as TranslationStore,
      notifyStore,
    };
  },
  methods: {
    onSuccess(msg: string) {
      this.notifyStore.setNotify({
        position: "top",
        type: "positive",
        message: msg || "",
      });
    },
  },
});
</script>
