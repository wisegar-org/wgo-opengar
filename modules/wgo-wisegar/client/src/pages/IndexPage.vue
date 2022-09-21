<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12">
      <IndexContent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "../wgo-base/core/components/BaseComponents";
import IndexContent from "../components/IndexContent/IndexContent.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    IndexContent,
  },
  setup() {
    const { seoData, setSeoData } = new BaseSeoDataComponent();
    useMeta(seoData);
    return {
      setSeoData,
    };
  },
});
</script>
