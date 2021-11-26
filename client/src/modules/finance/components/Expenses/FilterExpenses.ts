import { FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-shared'
import moment from 'moment'
import { ExpenseRecord, FilterIncomeObj } from '../../models/models'
import { getFrequencyOptions, getFrequencyString } from '../../models/parsers'

function filterClient(record: ExpenseRecord, filter?: string) {
  if (!filter) {
    return true
  }
  if (record.collaborator) {
    const filterStr = filter.toLowerCase()
    return (
      (record.collaborator.name || '').toLowerCase().indexOf(filterStr) !== -1 ||
      (record.collaborator.login || '').toLowerCase().indexOf(filterStr) !== -1
    )
  }
  return false
}

function isValidFilter(record: ExpenseRecord, filter: FilterIncomeObj): boolean {
  const date = moment(record.date.toString()).format('YYYY/MM/DD')
  return !(
    (filter.minDate && moment(filter.minDate.toString()).format('YYYY/MM/DD') > date) ||
    (filter.maxDate && moment(filter.maxDate.toString()).format('YYYY/MM/DD') < date) ||
    (filter.repeat !== undefined && filter.repeat !== record.repeat) ||
    !filterClient(record, filter.client)
  )
}

export function filterExpenses(data: ExpenseRecord[], filters: FilterIncomeObj): ExpenseRecord[] {
  return data.filter((item) => isValidFilter(item, filters))
}

export const repeatOption = getFrequencyOptions()
