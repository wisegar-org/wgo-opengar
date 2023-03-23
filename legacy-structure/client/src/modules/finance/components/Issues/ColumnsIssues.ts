import {
  ListItem,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import { ColumnTable, IssuesRecord } from '../../models/models';
import { ITranslationFinanceIssuesKeys } from './TranslationsKeys';

export const titleIssueField: PropToEdit = {
  required: true,
  visible: true,
  label: 'Title',
  prop: 'title',
  value: (row: ListItem) => `${row.number} - ${row.title}`,
  columns: 3
};
export const assignedToIssueField: PropToEdit = {
  visible: true,
  prop: 'assignedTo',
  label: 'Assigned To',
  value: (row: ListItem) =>
    row && row.assignedTo && (row.assignedTo as any).login
      ? (row.assignedTo as any).login
      : ''
};
export const statusIssueField: PropToEdit = {
  visible: true,
  label: 'Status',
  prop: 'accountId',
  value: (row: ListItem) => (row.accountId ? 'Accounted' : 'Pending')
};
export const labelsIssueField: PropToEdit = {
  visible: false,
  label: 'Labels',
  prop: 'labels',
  value: (row: ListItem) => `${row.labels}`,
  columns: 3
};
export const repoIssueField: PropToEdit = {
  visible: false,
  label: 'Repository',
  prop: 'repository.title',
  value: (row: ListItem) =>
    row.repository && (row.repository as any).title
      ? (row.repository as any).title
      : ''
};
export const milestonesIssueField: PropToEdit = {
  visible: false,
  label: 'Milestones',
  prop: 'milestones.label',
  value: (row: ListItem) => `${row.milestones}`
};

export const hoursIssueField: PropToEdit = {
  visible: true,
  label: 'Hours',
  prop: 'hours',
  value: (row: ListItem) => `${parseFloat(row.hours as string).toFixed(1)} h`
};

export const ColumnsIssues = [
  titleIssueField,
  assignedToIssueField,
  hoursIssueField,
  statusIssueField,
  labelsIssueField,
  repoIssueField
];

export const SimpleColumnsIssues = [
  {
    name: 'title',
    align: 'left',
    label: titleIssueField.label,
    field: 'title',
    sortable: true,
    classes: 'ellipsis',
    style: 'max-width: 250px'
  },
  {
    name: 'repository',
    label: repoIssueField.label,
    field: (row: IssuesRecord) =>
      row.repository && row.repository.title ? row.repository.title : '',
    align: 'left',
    sortable: true,
    classes: 'ellipsis',
    style: 'max-width: 100px'
  },
  {
    name: 'hpurs',
    label: hoursIssueField.label,
    field: 'hours',
    align: 'left',
    sortable: true
  }
];

export const setColumnsLanguage = (
  translations: ITranslationFinanceIssuesKeys
) => {
  titleIssueField.label = translations.WGO_FINANCE_ISSUES_COLUMN_TITLE;
  assignedToIssueField.label =
    translations.WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO;
  statusIssueField.label = translations.WGO_FINANCE_ISSUES_COLUMN_STATUS;
  statusIssueField.value = (row: ListItem) =>
    row.accountId
      ? translations.WGO_FINANCE_ISSUES_COLUMN_STATUS_ACCOUNTED
      : translations.WGO_FINANCE_ISSUES_COLUMN_STATUS_PENDING;
  labelsIssueField.label = translations.WGO_FINANCE_ISSUES_COLUMN_LABEL;
  repoIssueField.label = translations.WGO_FINANCE_ISSUES_COLUMN_REPOSITORY;
  hoursIssueField.label = translations.WGO_FINANCE_ISSUES_COLUMN_HOURS;
};
