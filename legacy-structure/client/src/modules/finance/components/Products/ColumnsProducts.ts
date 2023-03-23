import { ColumnProductTable, ProductRecord } from '../../models/models';
import { getProductTypeString } from '../../models/parsers';

export const nameProductField: ColumnProductTable = {
  name: 'nameProduct',
  required: true,
  label: 'Name',
  align: 'left',
  field: 'name',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const descriptionProductField: ColumnProductTable = {
  name: 'descriptionProduct',
  required: true,
  label: 'Description',
  align: 'left',
  field: 'description',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const sellPriceProductField: ColumnProductTable = {
  name: 'sellPriceProduct',
  align: 'left',
  label: 'Sell Price',
  field: 'sellPrice',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 250px'
};
export const buyPriceProductField: ColumnProductTable = {
  name: 'buyPriceProduct',
  label: 'Buy Price',
  field: (record: ProductRecord) =>
    record.type === 1 ? record.buyPrice.toString() : '-',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const typeProductField: ColumnProductTable = {
  name: 'typeProduct',
  label: 'Type',
  field: (record: ProductRecord) => getProductTypeString(record.type),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const unitCountProductField: ColumnProductTable = {
  name: 'unitCountProduct',
  label: 'Count',
  field: (record: ProductRecord) =>
    record.type === 1 ? record.unitCount.toString() : '-',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const buttonProductField: ColumnProductTable = {
  name: 'buttons',
  label: '',
  align: '',
  field: 'name',
  style: 'max-width: 100px'
};

export const ColumnsProducts = [
  nameProductField,
  // descriptionProductField,
  buyPriceProductField,
  sellPriceProductField,
  unitCountProductField,
  typeProductField,
  buttonProductField
];
