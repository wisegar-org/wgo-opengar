import moment from 'moment'
import {
  ColumnCollaboratorsTable,
  CollaboratorRecord,
  ColumnTable,
  ColumnStatsCollaboratorTable,
  WeeklyStats,
} from '../../models/models'

export const numberCollaboratorsField: ColumnCollaboratorsTable = {
  name: 'nameColl',
  required: true,
  label: 'Name',
  align: 'left',
  field: (row: CollaboratorRecord) => (row.name ? row.name : row.login),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const loginCollaboratorsField: ColumnCollaboratorsTable = {
  name: 'loginColl',
  required: true,
  label: 'User name',
  align: 'left',
  field: (row: CollaboratorRecord) => (row.login ? row.login : '-'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const urlCollaboratorsField: ColumnCollaboratorsTable = {
  name: 'urlColl',
  required: true,
  label: 'Url',
  align: 'left',
  field: (row: CollaboratorRecord) => (row.isCollaborator ? row.url : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const isCollaboratosField: ColumnCollaboratorsTable = {
  name: 'isColl',
  required: true,
  label: 'Role',
  align: 'left',
  field: (row: CollaboratorRecord) => (row.isCollaborator ? 'Collaborator' : 'Client/Provider'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const buttonCollaboratorField: ColumnCollaboratorsTable = {
  name: 'buttonsColl',
  label: '',
  align: '',
  style: 'max-width: 100px',
}

export const ColumnsCollaborators = [
  numberCollaboratorsField,
  loginCollaboratorsField,
  isCollaboratosField,
  urlCollaboratorsField,
  buttonCollaboratorField,
]

export const weekNumberCollStats: ColumnStatsCollaboratorTable = {
  name: 'weekNumberStats',
  required: true,
  label: 'Week number',
  align: 'left',
  field: 'week_number',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const weekCollStats: ColumnStatsCollaboratorTable = {
  name: 'weekStats',
  required: true,
  label: 'Week Date',
  align: 'left',
  field: (row: WeeklyStats) => moment(row.weekly.toString()).format('YYYY/MM/DD'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}
export const countTaskCollStats: ColumnStatsCollaboratorTable = {
  name: 'countTaskStats',
  required: true,
  label: 'Number Task',
  align: 'left',
  field: 'count_task',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const hoursTaskCollStats: ColumnStatsCollaboratorTable = {
  name: 'hoursTaskStats',
  required: true,
  label: 'Hours',
  align: 'left',
  field: 'hours',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const averageTaskCollStats: ColumnStatsCollaboratorTable = {
  name: 'averageTaskStats',
  required: true,
  label: 'Average',
  align: 'left',
  field: 'average',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px',
}

export const StatsCollaboratorColumns = [
  weekNumberCollStats,
  weekCollStats,
  countTaskCollStats,
  hoursTaskCollStats,
  averageTaskCollStats,
]
