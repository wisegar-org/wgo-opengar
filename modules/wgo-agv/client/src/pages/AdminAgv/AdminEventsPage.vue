<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <EventAdminComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventAdminComponent from "../../components/EventAdminComponent/EventAdminComponent.vue";

export default defineComponent({
  name: "AdminEventsPage",
  components: {
    EventAdminComponent,
  },
});
</script>
