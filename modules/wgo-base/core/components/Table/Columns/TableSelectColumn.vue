<template>
  <q-checkbox v-model="value" size="sm" @input="onRowSelect">
    <q-tooltip v-if="tooltip">{{ tooltip }} </q-tooltip>
  </q-checkbox>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TableSelectColumn",
  props: ["props"],
  computed: {
    tooltip(): string | false {
      if (this.props.col.extra && this.props.col.extra.tooltip) {
        if (typeof this.props.col.extra.tooltip == "function") {
          return this.props.col.extra.tooltip(this.props.row);
        } else {
          return this.props.col.extra.tooltip;
        }
      }
      return false;
    },
  },
  methods: {
    onRowSelect() {
      return this.$emit("rowSelect", this.value);
    },
  },
  emits: ["rowSelect"],
});
</script>
