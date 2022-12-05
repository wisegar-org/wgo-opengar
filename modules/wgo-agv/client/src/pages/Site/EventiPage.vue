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
import { BaseSeoDataComponent } from "../../../../src/wgo-base/core/components/BaseComponents";
import { useMeta } from "quasar";

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
  data() {
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);

    return {
      seoComponent,
    };
  },
  mounted() {
    this.seoComponent.setSeoData({
      title: "Eventi",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina eventi.",
      },
    } as any);
  },
});
</script>
  