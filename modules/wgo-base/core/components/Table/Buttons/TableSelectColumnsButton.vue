<template>
  <q-btn
    v-if="!schema.disableSelectColumns"
    flat
    round
    color="primary"
    icon="list"
  >
    <q-popup-proxy>
      <q-banner>
        <div v-for="(v, k) in columns" :key="k">
          <q-checkbox
            v-if="!v.required"
            v-model="v.visible"
            :label="v.label"
            size="xs"
            @update:model-value="changeColumnSelected"
          />
        </div>
      </q-banner>
    </q-popup-proxy>
    <q-tooltip>Mostra / Nascondi colonne</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ITableColumn, ITableSchema } from "../../../models/Table";

export default defineComponent({
  name: "TableSelectColumnsButton",
  props: {
    schema: {
      type: Object as PropType<ITableSchema>,
      default: { schema: {}, title: "", code: "id" },
    },
    columns: {
      type: Array as PropType<ITableColumn[]>,
      default: [],
    },
  },
  methods: {
    changeColumnSelected() {
      const visibleColumns = [];
      for (let item of this.columns) {
        if (item.visible) visibleColumns.push(item.name);
      }
      this.$emit("changeColumnSelected", visibleColumns);
    },
  },
  emits: ["changeColumnSelected"],
});
</script>
