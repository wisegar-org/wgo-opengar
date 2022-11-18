<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <ComitatoComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComitatoComponent from "../../components/ComitatoComponent/ComitatoComponent.vue";

export default defineComponent({
  name: "ComitatoPage",
  components: {
    ComitatoComponent,
  },
  setup() {},
});
</script>
