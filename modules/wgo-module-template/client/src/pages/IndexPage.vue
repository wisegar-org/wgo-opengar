<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12"></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";

export default defineComponent({
  name: "IndexPage",
  components: {},
  setup() {
    const { seoData, setSeoData } = new BaseSeoDataComponent();
    useMeta(seoData);
    return {
      setSeoData,
    };
  },
});
</script>
