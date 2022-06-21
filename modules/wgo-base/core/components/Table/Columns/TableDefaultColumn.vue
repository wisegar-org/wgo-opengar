<template>
  <div
    class="ellipsis"
    :style="{
      'min-width': props.col.width + 'px',
      width: props.col.width + 'px',
    }"
    v-html="props.value"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TableDefaultColumn",
  props: ["props"],
});
</script>
