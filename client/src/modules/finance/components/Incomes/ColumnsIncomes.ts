import { ColumnIncomeTable, IncomeRecord } from '../../models/models'
import moment from 'moment'
import { FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-core-ui'
import { getFrequencyString, getStatusPayedString } from '../../models/parsers'

export const nameIncomeField: ColumnIncomeTable = {
  name: 'nameIncome',
  required: true,
  label: 'Name',
  align: 'left',
  field: 'name',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const descriptionIncomeField: ColumnIncomeTable = {
  name: 'descriptionIncome',
  required: true,
  label: 'Description',
  align: 'left',
  field: 'description',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const dateIncomeField: ColumnIncomeTable = {
  name: 'dateIncome',
  align: 'left',
  label: 'Date',
  field: (row: IncomeRecord) => moment(row.date.toString()).format('YYYY-MM-DD'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 250px',
}
export const costIncomeField: ColumnIncomeTable = {
  name: 'amountIncome',
  label: 'Amount',
  field: 'amount',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const repeatIncomeField: ColumnIncomeTable = {
  name: 'repeatIncome',
  label: 'Repeat',
  field: (record: IncomeRecord) => getFrequencyString(record.repeat),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const statusIncomeField: ColumnIncomeTable = {
  name: 'statusIncome',
  label: 'Status',
  field: (record: IncomeRecord) => getStatusPayedString(record.status),
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const clientIncomeField: ColumnIncomeTable = {
  name: 'clientIncome',
  label: 'Client',
  field: (record: IncomeRecord) => {
    return record.collaborator ? record.collaborator.login : ''
  },
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const buttonIncomeField: ColumnIncomeTable = {
  name: 'buttons',
  label: '',
  align: '',
  style: 'max-width: 100px',
}

export const ColumnsIncomes = [
  nameIncomeField,
  clientIncomeField,
  // descriptionIncomeField,
  dateIncomeField,
  costIncomeField,
  statusIncomeField,
  repeatIncomeField,
  buttonIncomeField,
]
