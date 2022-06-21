<template>
  <q-td :props="props" :class="cellClass">
    <TableAvatarColumn v-if="props.col.type === 'avatar'" :props="props" />
    <TableBadgeColumn v-if="props.col.type === 'badges'" :props="props" />
    <TableCommandColumn
      v-if="props.col.type === 'iconCommands'"
      :props="props"
    />
    <TableDateColumn v-if="props.col.type === 'date'" :props="props" />
    <TableDecimalColumn v-if="props.col.type === 'decimal'" :props="props" />
    <TableIconColumn v-if="props.col.type === 'icon'" :props="props" />
    <TableIconStateColumn
      v-if="props.col.type === 'iconsState'"
      :props="props"
    />
    <TableMenuColumn v-if="props.col.type === 'menu'" :props="props" />

    <TableSelectColumn
      v-if="props.col.type === 'select'"
      :props="props"
      @rowSelect="onRowSelect"
    />
    <!-- Default render -->
    <TableDefaultColumn v-if="!props.col.type" :props="props" />
  </q-td>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import TableAvatarColumn from "./Columns/TableAvatarColumn.vue";
import TableBadgeColumn from "./Columns/TableBadgeColumn.vue";
import TableCommandColumn from "./Columns/TableCommandColumn.vue";
import TableDateColumn from "./Columns/TableDateColumn.vue";
import TableDecimalColumn from "./Columns/TableDecimalColumn.vue";
import TableDefaultColumn from "./Columns/TableDefaultColumn.vue";
import TableIconColumn from "./Columns/TableIconColumn.vue";
import TableIconStateColumn from "./Columns/TableIconStateColumn.vue";
import TableMenuColumn from "./Columns/TableMenuColumn.vue";
import TableSelectColumn from "./Columns/TableSelectColumn.vue";

export default defineComponent({
  name: "TableColumns",
  props: ["props", "schema"],
  components: {
    TableAvatarColumn,
    TableBadgeColumn,
    TableCommandColumn,
    TableDateColumn,
    TableDecimalColumn,
    TableDefaultColumn,
    TableIconColumn,
    TableIconStateColumn,
    TableMenuColumn,
    TableSelectColumn,
  },
  computed: {
    cellClass(): string | undefined {
      const rowClass =
        this.schema && this.schema.rowClass
          ? this.schema.rowClass(this.props.row)
          : "";
      const cellClass = this.props.col.cellClass
        ? this.props.col.cellClass(this.props.row)
        : "";
      return rowClass || cellClass ? `${rowClass} ${cellClass}` : undefined;
    },
  },
  methods: {
    onRowSelect(value: boolean): any {
      let row = this.props.row;
      row.select = value;
      this.$emit("rowSelect", row);
    },
  },
  emits: ["rowSelect"],
});
</script>
