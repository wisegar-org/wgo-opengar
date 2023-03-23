import moment from 'moment';
import {
  ListItem,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import { ColumnStatsCollaboratorTable, WeeklyStats } from '../../models/models';
import {
  ITranslationFinanceCollaboratorKeys,
  WGO_FINANCE_COLLABORATOR_COLUMN_EMAIL,
  WGO_FINANCE_COLLABORATOR_COLUMN_NAME,
  WGO_FINANCE_COLLABORATOR_COLUMN_ROLE,
  WGO_FINANCE_COLLABORATOR_COLUMN_URL,
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
  tooltip: 'Name',
  prop: 'name',
  value: (row: ListItem) => `${row.name ? row.name : row.login}`
};

export const loginCollaboratorsField: PropToEdit = {
  visible: true,
  label: 'User name',
  tooltip: 'User name',
  prop: 'left',
  value: (row: ListItem) => `${row.login ? row.login : '-'}`
};

export const urlCollaboratorsField: PropToEdit = {
  visible: false,
  label: 'Url',
  tooltip: 'Url',
  prop: 'url',
  value: (row: ListItem) => `${row.isCollaborator ? row.url : ''}`
};

export const isCollaboratosField: PropToEdit = {
  visible: true,
  label: 'Role',
  tooltip: 'Role',
  prop: 'type',
  value: (row: ListItem) => `${row.type ? row.typeTranslation : '-'}`
};

export const emailCollaboratorsField: PropToEdit = {
  visible: true,
  label: 'Email',
  tooltip: 'Email',
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
) => {
  clientRoleType.label =
    clientRoleType.value in translations
      ? (translations as any)[clientRoleType.value]
      : clientRoleType.value;
  providerRoleType.label =
    providerRoleType.value in translations
      ? (translations as any)[providerRoleType.value]
      : providerRoleType.value;
  collaboratorRoleType.label =
    collaboratorRoleType.value in translations
      ? (translations as any)[collaboratorRoleType.value]
      : collaboratorRoleType.value;

  numberCollaboratorsField.label =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_NAME];
  numberCollaboratorsField.tooltip =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_NAME];
  isCollaboratosField.label =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_ROLE];
  isCollaboratosField.tooltip =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_ROLE];
  emailCollaboratorsField.label =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_EMAIL];
  emailCollaboratorsField.tooltip =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_EMAIL];
  urlCollaboratorsField.label =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_URL];
  urlCollaboratorsField.tooltip =
    translations[WGO_FINANCE_COLLABORATOR_COLUMN_URL];

  weekNumberCollStats.label =
    translations.WGO_FINANCE_COLLABORATOR_COLUMN_WEEK_NUMBER;
  weekCollStats.label = translations.WGO_FINANCE_COLLABORATOR_COLUMN_WEEK;
  countTaskCollStats.label =
    translations.WGO_FINANCE_COLLABORATOR_COLUMN_COUNT_TASK;
  hoursTaskCollStats.label =
    translations.WGO_FINANCE_COLLABORATOR_COLUMN_HOURS_TASK;
  averageTaskCollStats.label =
    translations.WGO_FINANCE_COLLABORATOR_COLUMN_AVERAGE_TASK;
};
