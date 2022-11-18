<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <HomeComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "../wgo-base/core/components/BaseComponents";
import HomeComponent from "../components/HomeComponent/HomeComponent.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    HomeComponent,
  },
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
