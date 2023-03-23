<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <EventAdminComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventAdminComponent from '../../components/Admin/EventAdmin/EventAdminComponent.vue';

@Component({
  components: {
    EventAdminComponent
  }
})
export default class AdminEventsPage extends Vue {}
</script>
