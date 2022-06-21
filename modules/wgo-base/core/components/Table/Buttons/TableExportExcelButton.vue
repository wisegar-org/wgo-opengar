<template>
  <q-btn
    flat
    round
    color="primary"
    @click="exportExcel"
    icon="las la-file-excel"
  >
    <q-tooltip> Export Excel </q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ITableColumn, ITableData } from "../../../models/Table";
import { UtilService } from "../../../services/UtilService";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

export default defineComponent({
  name: "TableExportExcelButton",
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
    async exportExcel() {
      const fileName = "export.xlsx";
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Table");
      const worksheet = workbook.getWorksheet(1);
      worksheet.addRow(
        this.columns.map((c: ITableColumn) => {
          return c.label;
        })
      );

      this.data.map((d: ITableData) => {
        worksheet.addRow(
          this.columns.map((c: ITableColumn) => {
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
        );
      });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buf]), fileName);
    },
  },
});
</script>
