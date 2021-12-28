import { ColumnAccountTable, AccountRecord } from '../../models/models';
import moment from 'moment';
import {
  ITranslationFinanceAccountingKeys,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING
} from './TranslationsKeys';
import {
  ListItem,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';

export const pendingStatusType = {
  value: WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING,
  label: 'Pending'
};
export const confirmedStatusType = {
  value: WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED,
  label: 'Confirmed'
};
export const cancelledStatusType = {
  value: WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED,
  label: 'Cancelled'
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
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const statusAccountingField: ColumnAccountTable = {
  name: 'status',
  required: true,
  label: 'Status',
  align: 'left',
  field: (record: AccountRecord) => {
    return record.statusTranslation;
  },
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const ColumnsAccounting = [
  dateAccountingField,
  hoursAccountingField,
  issuesAccountingField,
  payAccountingField,
  statusAccountingField
];

export const setColumnsLanguage = (
  translations: ITranslationFinanceAccountingKeys
) => {
  dateAccountingField.label = translations.WGO_FINANCE_ACCOUNTING_COLUMN_DATE;
  hoursAccountingField.label =
    translations.WGO_FINANCE_ACCOUNTING_COLUMN_TOTAL_HOURS;
  issuesAccountingField.label =
    translations.WGO_FINANCE_ACCOUNTING_COLUMN_TOTAL_ISSUES;
  payAccountingField.label =
    translations.WGO_FINANCE_ACCOUNTING_COLUMN_TOTAL_TO_PAY;
  statusAccountingField.label =
    translations.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS;

  pendingStatusType.label =
    translations.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING;
  confirmedStatusType.label =
    translations.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED;
  cancelledStatusType.label =
    translations.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED;
};

export const accountedToAccounting: PropToEdit = {
  required: true,
  label: 'Accounted to',
  tooltip: 'Accounted to',
  prop: 'contributor.login',
  value: (row: ListItem) =>
    `${row.contributor ? (row.contributor as any).login : '-'}`
};

export const nameToAccounting: PropToEdit = {
  visible: true,
  label: 'Name',
  tooltip: 'Name',
  prop: 'contributor.name',
  value: (row: ListItem) =>
    `${row.contributor ? (row.contributor as any).name : '-'}`
};

export const totalToPayAccounting: PropToEdit = {
  visible: true,
  label: 'Total to Pay',
  tooltip: 'Total to Pay',
  prop: 'value',
  value: (row: ListItem) => {
    const { value } = row as { value: number; taxes: number };
    return `${value || 0}`;
  }
};

export const statusAccounting: PropToEdit = {
  visible: true,
  label: 'Status',
  tooltip: 'Status',
  prop: 'statusTranslation',
  value: (row: ListItem) =>
    `${row.statusTranslation ? row.statusTranslation : '-'}`
};

export const ListColumnsAccounting = [
  accountedToAccounting,
  nameToAccounting,
  totalToPayAccounting,
  statusAccounting
];
