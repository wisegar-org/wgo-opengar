<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <ScheduleContent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScheduleContent from '../../components/admin/ScheduleContent/ScheduleContent.vue';

export default defineComponent({
  name: 'AdminSchedulePage',
  components: {
    ScheduleContent,
  },
});
</script>
