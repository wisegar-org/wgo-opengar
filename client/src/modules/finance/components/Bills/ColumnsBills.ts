import {
  ColumnBillTable,
  BillRecord,
  ColumnProductsBillTable,
  ProductsBill
} from '../../models/models';
import { getBillStatusString } from '../../models/parsers';

export const nameBillField: ColumnBillTable = {
  name: 'nameBill',
  required: true,
  label: 'Name',
  align: 'left',
  field: 'name',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const descriptionBillField: ColumnBillTable = {
  name: 'descriptionBill',
  required: true,
  label: 'Description',
  align: 'left',
  field: 'description',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const clientBillField: ColumnBillTable = {
  name: 'clientBill',
  align: 'left',
  label: 'Client',
  field: (record: BillRecord) => record.client.name,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 250px'
};
export const totalPriceBillField: ColumnBillTable = {
  name: 'totalPriceBill',
  label: 'Total Price',
  field: (record: BillRecord) =>
    record.totalPrice !== record.totalWithDiscount
      ? `${record.totalWithDiscount} ( ${record.totalPrice} )`
      : `${record.totalPrice}`,
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const countProductBillField: ColumnBillTable = {
  name: 'countProductBill',
  label: 'Count Products',
  field: (record: BillRecord) => record.products.length.toString(),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const statusBillField: ColumnBillTable = {
  name: 'statusBill',
  label: 'Status',
  field: (record: BillRecord) => getBillStatusString(record.status),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const buttonBillField: ColumnBillTable = {
  name: 'buttons',
  label: '',
  align: '',
  field: 'name',
  style: 'max-width: 100px'
};

export const ColumnsBills = [
  nameBillField,
  // descriptionBillField,
  clientBillField,
  totalPriceBillField,
  countProductBillField,
  statusBillField,
  buttonBillField
];

export const productBillNameField: ColumnProductsBillTable = {
  name: 'productBillName',
  label: 'Poduct',
  field: (record: ProductsBill) => record.product.name,
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const productBillSellPriceField: ColumnProductsBillTable = {
  name: 'productBillSellPrice',
  label: 'Sell Price',
  field: (record: ProductsBill) => record.product.sellPrice.toString(),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const productBillCountField: ColumnProductsBillTable = {
  name: 'productBillCount',
  label: 'Count',
  field: (record: ProductsBill) =>
    record.type === 1
      ? `${record.count} unit${record.count > 0 ? 's' : ''}`
      : `${record.count} hours`,
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const ColumnsProductsBill = [
  productBillNameField,
  productBillSellPriceField,
  productBillCountField,
  buttonBillField
];
