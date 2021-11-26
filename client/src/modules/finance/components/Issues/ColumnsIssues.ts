import { ColumnTable, IssuesRecord } from '../../models/models'

export const numberIssueField: ColumnTable = {
  name: 'number',
  required: true,
  label: 'Number',
  align: 'left',
  field: 'number',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const titleIssueField: ColumnTable = {
  name: 'title',
  align: 'left',
  label: 'Title',
  field: 'title',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 250px',
}
export const assignedToIssueField: ColumnTable = {
  name: 'assignedTo',
  label: 'Assigned To',
  field: (row: IssuesRecord) =>
    row && row.assignedTo && row.assignedTo.login ? row.assignedTo.login : '',
  align: 'center',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const statusIssueField: ColumnTable = {
  name: 'status',
  label: 'Status',
  field: 'status',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const labelsIssueField: ColumnTable = {
  name: 'labels',
  label: 'Labels',
  align: 'left',
  field: (row: IssuesRecord) => row.labels,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const repoIssueField: ColumnTable = {
  name: 'repository',
  label: 'Repository',
  field: (row: IssuesRecord) =>
    row.repository && row.repository.title ? row.repository.title : '',
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
// export const projectIssueField: ColumnTable = {
//   name: 'project',
//   label: 'Project',
//   field: (row: IssuesRecord) =>
//     row.project && row.project.title ? row.project.title : '',
//   align: 'left',
//   sortable: true,
//   classes: 'ellipsis',
//   style: 'max-width: 100px',
// }
export const milestonesIssueField: ColumnTable = {
  name: 'milestones',
  label: 'Milestones',
  field: (row: IssuesRecord) => row.milestones,
  align: 'left',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const hoursIssueField: ColumnTable = {
  name: 'hpurs',
  label: 'Hours',
  field: 'hours',
  align: 'left',
  sortable: true
}

export const buttonIssueField: ColumnTable = {
  name: 'buttons',
  label: '',
  align: '',
  style: 'max-width: 100px',
  field: 'id'
}

export const ColumnsIssues = [
  numberIssueField,
  titleIssueField,
  assignedToIssueField,
  statusIssueField,
  labelsIssueField,
  repoIssueField,
  // projectIssueField,
  // milestonesIssueField,
  hoursIssueField,
  buttonIssueField
]

export const SimpleColumnsIssues = [
  numberIssueField,
  titleIssueField,
  repoIssueField,
  hoursIssueField
]
