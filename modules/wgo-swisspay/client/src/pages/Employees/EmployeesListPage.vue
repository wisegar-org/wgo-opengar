<template>
  <EmployeesList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EmployeesList from '../../components/Employees/EmployeesList.vue';

export default defineComponent({
  name: 'EmployeesListPage',
  components: {
    EmployeesList,
  },
});
</script>
