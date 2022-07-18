<template>
  <EmployeesList :tranStore="tranStore" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TranslationStore } from '../../../../../wgo-base/translation/models/TranslationStore';
import EmployeesList from '../../components/Employees/EmployeesList.vue';
import { useTranslationStore } from '../../stores/translationStore';

export default defineComponent({
  name: 'EmployeesListPage',
  components: {
    EmployeesList,
  },
  setup() {
    const tranStore = useTranslationStore();

    return {
      tranStore: tranStore.translationStore as TranslationStore,
    };
  },
});
</script>
