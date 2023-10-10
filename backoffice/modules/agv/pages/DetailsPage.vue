<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <EventDetailsComponent :itemId="itemId" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import EventDetailsComponent from "src/components/EventDetailsComponent/EventDetailsComponent.vue";

export default defineComponent({
  name: "DetailsPage",
  components: {
    EventDetailsComponent,
  },
  props: {
    itemId: { type: Number, default: 0 },
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
      title: "Details",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina dei dettagli.",
      },
    } as unknown as ISeoModel);
  },
});
</script>
