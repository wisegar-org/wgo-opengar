import { ColumnAccountTable, AccountRecord } from '../../models/models';
import moment from 'moment';

export const collAccountingField: ColumnAccountTable = {
  name: 'collaborator',
  required: true,
  label: 'Collaborator',
  align: 'left',
  field: (record: AccountRecord) =>
    record.contributor ? record.contributor.login : '',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const dateAccountingField: ColumnAccountTable = {
  name: 'date',
  required: true,
  label: 'Date',
  align: 'left',
  field: (record: AccountRecord) =>
    moment(record.date.toString()).format('YYYY-MM-DD'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const hoursAccountingField: ColumnAccountTable = {
  name: 'hours',
  required: true,
  label: 'Total hours',
  align: 'left',
  field: 'total_hours',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const issuesAccountingField: ColumnAccountTable = {
  name: 'issues',
  required: true,
  label: 'Total issues',
  align: 'left',
  field: 'total_issues',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const payAccountingField: ColumnAccountTable = {
  name: 'pay',
  required: true,
  label: 'Total to pay',
  align: 'left',
  field: (record: AccountRecord) => `${record.value}`,
  //field: (record: AccountRecord) => `${(record.value * 1000 + record.taxes * 1000) / 1000}`,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const buttonAccountingField: ColumnAccountTable = {
  name: 'buttons',
  label: '',
  align: '',
  style: 'max-width: 100px'
};

export const statusAccountingField: ColumnAccountTable = {
  name: 'status',
  required: true,
  label: 'Status',
  align: 'left',
  field: (record: AccountRecord) => {
    switch (record.status) {
      case 1:
        return 'Pending';
        break;
      case 2:
        return 'Confirmed';
        break;
      case 3:
        return 'Cancelled';
        break;
      default:
        return 'Pending';
        break;
    }
  },
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const ColumnsAccounting = [
  collAccountingField,
  dateAccountingField,
  issuesAccountingField,
  hoursAccountingField,
  payAccountingField,
  statusAccountingField,
  buttonAccountingField
];
