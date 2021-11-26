<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <ScheduleAdminComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScheduleAdminComponent from '../../components/admin/ScheduleAdminComponent.vue';

@Component({
  components: {
    ScheduleAdminComponent
  }
})
export default class AdminSchedulePage extends Vue {}
</script>
