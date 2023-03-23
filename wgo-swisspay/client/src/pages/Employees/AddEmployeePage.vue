<template>
  <AddEmployee :tranStore="tranStore" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import AddEmployee from '../../components/Employees/AddEmployee/AddEmployee.vue';
import { useTranslationStore } from '../../stores/translationStore';

export default defineComponent({
  name: 'AddEmployeesPage',
  components: {
    AddEmployee,
  },
  setup() {
    const tranStore = useTranslationStore();

    return {
      tranStore: tranStore.translationStore as TranslationStore,
    };
  },
});
</script>
