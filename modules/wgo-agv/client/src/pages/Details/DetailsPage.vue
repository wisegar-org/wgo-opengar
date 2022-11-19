<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <EventDetailsComponent :itemId="itemId" />
    </div>
  </q-page>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import EventDetailsComponent from "../../components/EventDetailsComponent/EventDetailsComponent.vue";

export default defineComponent({
  name: "DetailsPage",
  components: {
    EventDetailsComponent,
  },
  props: {
    itemId: { type: Number, default: 0 },
  },
  setup() {
    return {};
  },
});
</script>
  