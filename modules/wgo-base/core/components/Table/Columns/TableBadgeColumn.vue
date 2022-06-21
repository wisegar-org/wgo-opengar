<template>
  <div class="q-gutter-xs">
    <q-badge
      v-for="(v, k) in getValue()"
      :key="k"
      :color="props.col.extra[v] ? props.col.extra[v] : 'primary'"
    >
      {{ v }}</q-badge
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TableBadgeColumn",
  props: ["props"],
  methods: {
    getValue() {
      const result =
        typeof this.props.col.field === "string"
          ? this.props.row[this.props.col.field]
          : this.props.value;

      return result;
    },
  },
});
</script>
