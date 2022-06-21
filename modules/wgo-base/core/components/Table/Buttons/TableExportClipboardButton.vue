<template>
  <q-btn
    flat
    round
    color="primary"
    @click="exportClipboard"
    icon="content_copy"
  >
    <q-tooltip> Copy to clipboard </q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

import { ITableColumn, ITableData } from "../../../models/Table";
import { UtilService } from "../../../services/UtilService";

export default defineComponent({
  name: "TableExportClipboardButton",
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
    async exportClipboard() {
      let text =
        this.columns
          .map((c: ITableColumn) => {
            return c.label;
          })
          .join(";") + "\n";

      const righe = this.data.map((d: ITableData) => {
        const riga = this.columns
          .map((c: ITableColumn) => {
            let value;
            if (typeof c.field == "function") {
              value = c.field(d);
            } else {
              value = d[c.field];
            }
            if (c.type === "date" && c.extra)
              value = UtilService.parseDate(value, c.extra as string);
            return value;
          })
          .join(";");
        const regexp = /\n/gi;
        return riga.replace(regexp, "/");
      });
      text += righe.join("\n");

      if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        await navigator.clipboard.writeText(text);
    },
  },
});
</script>
