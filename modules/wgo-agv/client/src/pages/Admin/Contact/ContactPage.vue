<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <ContactEditor
        :tranStore="tranStore"
        :langStore="langStore"
        @showMessage="showMessage"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactEditor from "../../../wgo-base/client/contact/components/ContactEditor/ContactEditor.vue";
import { useTranslationStore } from "../../../stores/translationStore";
import { useLanguageStore } from "../../../stores/languageStore";
import { useNotifyStore } from "../../../stores/notifyStore";

export default defineComponent({
  name: "AdminContactPage",
  components: {
    ContactEditor,
  },
  setup() {
    const tranStore = useTranslationStore();
    const langStore = useLanguageStore();
    const notifyStore = useNotifyStore();

    return {
      tranStore: tranStore.translationStore as any,
      langStore: langStore.languageStore as any,
      notifyStore,
    };
  },
  methods: {
    showMessage(status: boolean, msg: string) {
      this.notifyStore.setNotify({
        position: "top",
        message: msg,
        type: status ? "positive" : "negative",
      });
    },
  },
});
</script>
