<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <home-component></home-component>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import { useMeta } from "quasar";

export default defineComponent({
  name: "IndexPage",
  components: {},
  setup() {
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    onBeforeMount(() => {
      seoComponent.setSeoData({
        title: "Home",
        webSite: "Assemblea Genitori di Vezia",
        description: {
          name: "description",
          content:
            "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina iniziale.",
        },
      } as unknown as ISeoModel);
    });
    return {
      seoComponent,
    };
  },
});
</script>
