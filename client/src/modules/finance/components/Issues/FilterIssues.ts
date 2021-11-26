import moment from 'moment'
import { FilterIssuesModel, FiltersItemList, IssuesRecord, OptionFilter } from '../../models/models'
import {
  assignedToIssueField,
  labelsIssueField,
  // projectIssueField,
  milestonesIssueField,
  repoIssueField,
} from './ColumnsIssues'

function isValidFilter(
  data: IssuesRecord,
  itemFilter: FiltersItemList,
  value: OptionFilter | null
) {
  const columnTable = itemFilter.column
  const valueRow =
    typeof columnTable.field === 'function' ? columnTable.field(data) : data[columnTable.field]
  return valueRow && value && typeof valueRow === 'string'
    ? itemFilter.contain
      ? valueRow.indexOf(value.label) > -1
      : valueRow === value.label
    : false
}

function dateValidFilter(item: IssuesRecord, minDate?: string, maxDate?: string) {
  const date = moment(item.closed_at.toString()).format('YYYY/MM/DD')
  return (!minDate || date >= minDate) && (!maxDate || date <= maxDate)
}

const filtersConfig: FiltersItemList[] = [
  {
    prop: 'assignedTo',
    column: assignedToIssueField,
    contain: false,
  },
  {
    prop: 'labels',
    column: labelsIssueField,
    contain: true,
  },
  // {
  //   prop: 'project',
  //   column: projectIssueField,
  //   contain: false
  // },
  {
    prop: 'repository',
    column: repoIssueField,
    contain: false,
  },
  {
    prop: 'milestones',
    column: milestonesIssueField,
    contain: false,
  },
]

export function filterIssues(data: IssuesRecord[], filters: FilterIssuesModel): IssuesRecord[] {
  const minDate = filters.minDate
    ? moment(filters.minDate.toString()).format('YYYY/MM/DD')
    : undefined
  const maxDate = filters.maxDate
    ? moment(filters.maxDate.toString()).format('YYYY/MM/DD')
    : undefined
  return data.filter(
    (item) =>
      filtersConfig.filter(
        (filterItem) =>
          filters[filterItem.prop] && !isValidFilter(item, filterItem, filters[filterItem.prop])
      ).length === 0 && dateValidFilter(item, minDate, maxDate)
  )
}
