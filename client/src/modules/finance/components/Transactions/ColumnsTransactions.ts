import { ColumnTable, ColumnTransactionTable, TransactionRecord } from '../../models/models'
import moment from 'moment'

export const collaboratorNameTransactionField: ColumnTransactionTable = {
  name: 'collaboratorName',
  required: true,
  label: 'Collaborator',
  align: 'left',
  field: (row: TransactionRecord) =>
    row && row.collaborator
      ? row.collaborator.name
        ? row.collaborator.name
        : row.collaborator.login
      : '',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const collaboratorCardTransactionField: ColumnTransactionTable = {
  name: 'collaboratorCard',
  required: true,
  label: 'Card Number',
  align: 'left',
  field: (row: TransactionRecord) => (row && row.collaborator ? row.collaborator.card_number : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const dateTransactionField: ColumnTransactionTable = {
  name: 'date',
  align: 'left',
  label: 'Date',
  field: (row: TransactionRecord) => moment(row.date.toString()).format('YYYY-MM-DD'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 250px',
}
export const costTransactionField: ColumnTransactionTable = {
  name: 'cost',
  label: 'Cost',
  field: 'cost',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const statusTransactionField: ColumnTransactionTable = {
  name: 'status',
  label: 'Status',
  field: 'status',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const balanceTransactionField: ColumnTransactionTable = {
  name: 'balance',
  label: 'Card balance',
  align: 'left',
  field: 'card_balance',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const buttonTransactionField: ColumnTable = {
  name: 'buttons',
  label: '',
  align: '',
  style: 'max-width: 100px',
  field: 'id',
}

export const ColumnsTransactions = [
  collaboratorNameTransactionField,
  collaboratorCardTransactionField,
  dateTransactionField,
  costTransactionField,
  // balanceTransactionField,
  statusTransactionField,
  buttonTransactionField,
]
