<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <ComitatoComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import ComitatoComponent from "../../components/ComitatoComponent/ComitatoComponent.vue";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";

export default defineComponent({
  name: "ComitatoPage",
  components: {
    ComitatoComponent,
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
      title: "Comitato",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina del comitato.",
      },
    } as any);
  },
});
</script>
