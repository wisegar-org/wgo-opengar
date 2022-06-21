<template>
  <q-btn flat round color="primary" @click="exportCSV" icon="las la-file-csv">
    <q-tooltip>Esport CSV</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ITableColumn, ITableData } from "../../../models/Table";
import { UtilService } from "../../../services/UtilService";
import { saveAs } from "file-saver";

export default defineComponent({
  name: "TableExportCsvButton",
  props: {
    data: {
      type: Array as PropType<ITableData[]>,
      default: [],
    },
    columns: {
      type: Array as PropType<ITableColumn[]>,
      default: [],
    },
  },
  methods: {
    async exportCSV() {
      const fileName = "export.csv";
      const columns = this.columns.filter((col) => col.type !== "iconCommands");
      let text =
        columns
          .map((c: ITableColumn) => {
            return c.label;
          })
          .join(",") + ",\n";

      const rows = this.data.map((d: ITableData) => {
        const row = columns
          .map((c: ITableColumn) => {
            let value;
            if (typeof c.field == "function") {
              value = c.field(d);
            } else {
              value = d[c.field];
            }
            if (c.type === "date" && c.extra)
              value = value
                ? UtilService.parseDate(value, c.extra as string)
                : "";
            return value;
          })
          .join(",");
        const regexp = /\n/gi;
        return row.replace(regexp, "/");
      });
      text += rows.join(",\n");

      saveAs(new Blob([text]), fileName);
    },
  },
});
</script>
