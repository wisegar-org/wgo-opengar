import { ListItem, PropToEdit } from './models';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const ExpandableListExportExcel = async (
  itemList: ListItem[],
  columns: PropToEdit[]
) => {
  const filterColumns = columns.filter(prop => prop.required || prop.visible);
  const fileName = 'export.xlsx';
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Table');
  const worksheet = workbook.getWorksheet(1);
  worksheet.addRow(
    filterColumns.map((c: PropToEdit) => {
      return c.label;
    })
  );

  itemList.map((d: ListItem) => {
    worksheet.addRow(
      filterColumns
        .filter(prop => prop.required || prop.visible)
        .map((c: PropToEdit) => {
          if (c.value) return c.value(d);
          return d[c.prop];
        })
    );
  });

  const buf = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buf]), fileName);
};

export const ExpandableListExportCSV = async (
  itemList: ListItem[],
  columns: PropToEdit[]
) => {
  const fileName = 'export.csv';
  const filterColumns = columns.filter(prop => prop.required || prop.visible);
  let content =
    filterColumns
      .map((c: PropToEdit) => {
        return c.label;
      })
      .join(',') + ',\n';

  itemList.map((d: ListItem) => {
    content +=
      filterColumns
        .map((c: PropToEdit) => {
          return d[c.prop];
        })
        .join(',') + ',\n';
  });

  saveAs(new Blob([content]), fileName);
};

export const ExpandableListExportClipboard = (
  itemList: ListItem[],
  columns: PropToEdit[]
) => {
  const filterColumns = columns.filter(prop => prop.required || prop.visible);
  let content =
    filterColumns
      .map((c: PropToEdit) => {
        return c.label;
      })
      .join(';') + '\n';

  itemList.map((d: ListItem) => {
    content +=
      filterColumns
        .map((c: PropToEdit) => {
          return d[c.prop];
        })
        .join(';') + '\n';
  });

  return content;
};
