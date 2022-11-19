<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <EventListComponent :eventType="eventType" :detailPath="detailPath" />
    </div>
  </q-page>
</template>
  
  <script lang="ts">
import { ITemType } from "../../models/Item";
import { defineComponent } from "vue";
import EventListComponent from "../../components/EventListComponent/EventListComponent.vue";
import { AGVDetailsPaths } from "../../router/paths/detailsPath";

export default defineComponent({
  name: "CorsiPage",
  components: {
    EventListComponent,
  },
  setup() {
    return {
      eventType: ITemType.Event,
      detailPath: AGVDetailsPaths.eventiDetails.path,
    };
  },
});
</script>
  