import { ColumnExpenseTable, ExpenseRecord } from '../../models/models'
import moment from 'moment'
import { getFrequencyString, getStatusPayedString } from '../../models/parsers'

export const nameExpenseField: ColumnExpenseTable = {
  name: 'nameExpense',
  required: true,
  label: 'Name',
  align: 'left',
  field: 'name',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const descriptionExpenseField: ColumnExpenseTable = {
  name: 'descriptionExpense',
  required: true,
  label: 'Description',
  align: 'left',
  field: 'description',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const dateExpenseField: ColumnExpenseTable = {
  name: 'dateExpense',
  align: 'left',
  label: 'Date',
  field: (row: ExpenseRecord) => moment(row.date.toString()).format('YYYY-MM-DD'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 250px',
}
export const costExpenseField: ColumnExpenseTable = {
  name: 'costExpense',
  label: 'Cost',
  field: 'cost',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const statusExpenseField: ColumnExpenseTable = {
  name: 'statusExpense',
  label: 'Status',
  field: (record: ExpenseRecord) => getStatusPayedString(record.status),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const repeatExpenseField: ColumnExpenseTable = {
  name: 'repeatExpense',
  label: 'Repeat',
  field: (record: ExpenseRecord) => getFrequencyString(record.repeat),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const providerExpenseField: ColumnExpenseTable = {
  name: 'providerExpense',
  label: 'Provider',
  field: (record: ExpenseRecord) => {
    return record.collaborator ? record.collaborator.login : ''
  },
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const buttonExpenseField: ColumnExpenseTable = {
  name: 'buttons',
  label: '',
  align: '',
  field: 'name',
  style: 'max-width: 100px',
}

export const ColumnsExpenses = [
  nameExpenseField,
  providerExpenseField,
  // descriptionExpenseField,
  dateExpenseField,
  costExpenseField,
  statusExpenseField,
  repeatExpenseField,
  buttonExpenseField,
]
