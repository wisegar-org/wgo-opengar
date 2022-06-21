<template>
  <div class="column fit">
    <q-item class="q-pa-none">
      <q-item-section top class="self-center">
        <div class="text-h6 text-left">
          {{ title }}
        </div>
      </q-item-section>
      <q-item-section top side class="self-center">
        <div class="row items-center">
          <!-- Buttons -->
        </div>
      </q-item-section>
    </q-item>
    <div class="text-weight-medium">{{ searchText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TableTitleHeader",
  props: {
    title: String,
    searchText: String,
  },
});
</script>
