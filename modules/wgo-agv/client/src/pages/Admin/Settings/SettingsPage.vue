<template>
  <SettingsList :tranStore="translationStore" @success="success" />
</template>

<script lang="ts">
import { useTranslationStore } from "../../../stores/translationStore";
import { defineComponent } from "vue";
import { useNotifyStore } from "../../../stores/notifyStore";
import SettingsList from "../../../wgo-base/client/settings/components/SettingsList/SettingsList.vue";
import { TranslationStore } from "../../../wgo-base/client/translation/store/TranslationStore";

export default defineComponent({
  name: "SettingsPage",
  components: {
    SettingsList,
  },
  setup() {
    const translationStore = useTranslationStore();
    const notifyStore = useNotifyStore();
    return {
      translationStore: translationStore.translationStore as TranslationStore,
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
