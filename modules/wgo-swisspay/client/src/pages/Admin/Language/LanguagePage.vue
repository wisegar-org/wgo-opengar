<template>
  <LanguageList :langStore="langStore" @create="onCreate" @edit="onEdit" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LanguageList from '../../../../../../wgo-base/language/components/LanguageList/LanguageList.vue';
import { useLanguageStore } from '../../../stores/languageStore';
import { useNotifyStore } from '../../../stores/notifyStore';

export default defineComponent({
  name: 'LanguagePage',
  components: {
    LanguageList,
  },
  setup() {
    const languageStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    return {
      langStore: languageStore.languageStore,
      notifyStore,
    };
  },
  methods: {
    onCreate() {
      this.notifyStore.setNotify({
        position: 'top',
        type: 'positive',
        message: 'Language created successfuly',
      });
    },
    onEdit() {
      this.notifyStore.setNotify({
        position: 'top',
        type: 'positive',
        message: 'Language edited successfuly',
      });
    },
  },
});
</script>
