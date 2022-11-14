<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12"></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "../wgo-base/core/components/BaseComponents";

export default defineComponent({
  name: "IndexPage",
  components: {},
  data() {
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);

    return {
      seoComponent,
    };
  },
  setup() {},
  mounted() {
    this.seoComponent.setSeoData({
      title: "Index",
      webSite: "Assemblea Genitori Vezia",
    } as any);
  },
});
</script>
