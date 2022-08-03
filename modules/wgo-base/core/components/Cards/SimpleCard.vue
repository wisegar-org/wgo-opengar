<template>
  <q-card flat bordered style="min-height: 250px" class="text-center">
    <q-card-section class="q-pb-none">
      <div>{{ title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none text-grey-7" v-html="getDescription()">
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { minText } from "./Utils";

export default defineComponent({
  name: "SimpleCard",
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  methods: {
    getDescription() {
      return minText(this.description, 380, 3);
    },
  },
});
</script>
