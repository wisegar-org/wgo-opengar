<template>
  <q-page class="row items-center justify-between">
    <div class="col-12"></div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from "../components/models";
import ExampleComponent from "../components/ExampleComponent.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { ExampleComponent },
  setup() {},
});
</script>
