import moment from 'moment';
import {
  ListItem,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import { ColumnStatsCollaboratorTable, WeeklyStats } from '../../models/models';
import {
  ITranslationFinanceCollaboratorKeys,
  WGO_FINANCE_COLLABORATOR_ROLE_CLIENT,
  WGO_FINANCE_COLLABORATOR_ROLE_COLLABORATOR,
  WGO_FINANCE_COLLABORATOR_ROLE_PROVIDER
} from './TranslationsKeys';

export const clientRoleType = {
  value: WGO_FINANCE_COLLABORATOR_ROLE_CLIENT,
  label: 'Client'
};
export const providerRoleType = {
  value: WGO_FINANCE_COLLABORATOR_ROLE_PROVIDER,
  label: 'Provider'
};
export const collaboratorRoleType = {
  value: WGO_FINANCE_COLLABORATOR_ROLE_COLLABORATOR,
  label: 'Collaborator'
};

export const numberCollaboratorsField: PropToEdit = {
  required: true,
  label: 'Name',
  prop: 'name',
  value: (row: ListItem) => `${row.name ? row.name : row.login}`
};

export const loginCollaboratorsField: PropToEdit = {
  visible: true,
  label: 'User name',
  prop: 'left',
  value: (row: ListItem) => `${row.login ? row.login : '-'}`
};

export const urlCollaboratorsField: PropToEdit = {
  visible: false,
  label: 'Url',
  prop: 'url',
  value: (row: ListItem) => `${row.isCollaborator ? row.url : ''}`
};

export const isCollaboratosField: PropToEdit = {
  visible: true,
  label: 'Role',
  prop: 'type',
  value: (row: ListItem) => `${row.type ? row.typeTranslation : '-'}`
};

export const emailCollaboratorsField: PropToEdit = {
  visible: true,
  label: 'Email',
  prop: 'email',
  value: (row: ListItem) => (row.email ? `${row.email}` : '-')
};

export const ColumnsCollaborators: PropToEdit[] = [
  numberCollaboratorsField,
  isCollaboratosField,
  emailCollaboratorsField,
  urlCollaboratorsField
];

export const weekNumberCollStats: ColumnStatsCollaboratorTable = {
  name: 'weekNumberStats',
  required: true,
  label: 'Week number',
  align: 'left',
  field: 'week_number',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const weekCollStats: ColumnStatsCollaboratorTable = {
  name: 'weekStats',
  required: true,
  label: 'Week Date',
  align: 'left',
  field: (row: WeeklyStats) =>
    moment(row.weekly.toString()).format('YYYY/MM/DD'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const countTaskCollStats: ColumnStatsCollaboratorTable = {
  name: 'countTaskStats',
  required: true,
  label: 'Number Task',
  align: 'left',
  field: 'count_task',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const hoursTaskCollStats: ColumnStatsCollaboratorTable = {
  name: 'hoursTaskStats',
  required: true,
  label: 'Hours',
  align: 'left',
  field: 'hours',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const averageTaskCollStats: ColumnStatsCollaboratorTable = {
  name: 'averageTaskStats',
  required: true,
  label: 'Average',
  align: 'left',
  field: 'average',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const StatsCollaboratorColumns = [
  weekNumberCollStats,
  weekCollStats,
  countTaskCollStats,
  hoursTaskCollStats,
  averageTaskCollStats
];

export const setColumnsLanguage = (
  translations: ITranslationFinanceCollaboratorKeys
) => {};
