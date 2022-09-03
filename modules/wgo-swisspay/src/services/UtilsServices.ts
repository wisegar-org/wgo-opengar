import { IEmployeeToImportModel } from '../models/EmployeesModel';

export const readEmployeesFromFile = async (file: Promise<unknown>) => {
  const fileInput = await file;
  const { createReadStream, filename, mimetype, encoding } = fileInput as any;
  const stream: any = createReadStream();

  const ExcelJS = require('exceljs');

  const wb = new ExcelJS.Workbook();

  await wb.xlsx.read(stream);
  const ws = wb.getWorksheet();
  let index = 2;
  let row = ws.getRow(index);

  const result: IEmployeeToImportModel[] = [];
  while (row.getCell(1).value !== null) {
    try {
      result.push({
        name: row.getCell(1).value || '',
        lastName: row.getCell(2).value || '',
        email: row.getCell(3).value?.text || '',
        code: row.getCell(4).value || '',
      });
    } catch (err: any) {
      console.log(err.message);
    }
    index += 1;
    row = ws.getRow(index);
  }

  return result;
};
