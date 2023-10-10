<template>
  <q-page>
    <router-view />
  </q-page>
</template>
<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import { BaseSeoDataComponent } from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
export default defineComponent({
  name: "MentorLayout",
  components: {},

  setup() {
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);

    return {
      seoComponent,
    };
  },
});
</script>
