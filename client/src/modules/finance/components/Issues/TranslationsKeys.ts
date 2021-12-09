import { ITranslations } from 'src/modules/wgo/models';

export const WGO_FINANCE_ISSUES_COLUMN_REPOSITORY =
  'WGO_FINANCE_ISSUES_COLUMN_REPOSITORY';
export const WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO =
  'WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO';
export const WGO_FINANCE_ISSUES_COLUMN_LABEL =
  'WGO_FINANCE_ISSUES_COLUMN_LABEL';
export const WGO_FINANCE_ISSUES_COLUMN_STATUS =
  'WGO_FINANCE_ISSUES_COLUMN_STATUS';
export const WGO_FINANCE_ISSUES_COLUMN_START_DATE =
  'WGO_FINANCE_ISSUES_COLUMN_START_DATE';
export const WGO_FINANCE_ISSUES_COLUMN_END_DATE =
  'WGO_FINANCE_ISSUES_COLUMN_END_DATE';

export interface ITranslationFinanceIssuesKeys extends ITranslations {
  WGO_FINANCE_ISSUES_TITLE: string;
  WGO_FINANCE_ISSUES_TITLE_BC: string;
  WGO_FINANCE_ISSUES_FILTER_TITLE: string;
  WGO_FINANCE_ISSUES_COLUMN_TITLE: string;
  WGO_FINANCE_ISSUES_COLUMN_DESCRIPTION: string;
  [WGO_FINANCE_ISSUES_COLUMN_STATUS]: string;
  WGO_FINANCE_ISSUES_COLUMN_STATUS_PENDING: string;
  WGO_FINANCE_ISSUES_COLUMN_STATUS_ACCOUNTED: string;
  [WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO]: string;
  [WGO_FINANCE_ISSUES_COLUMN_LABEL]: string;
  [WGO_FINANCE_ISSUES_COLUMN_REPOSITORY]: string;
  WGO_FINANCE_ISSUES_COLUMN_HOURS: string;
  WGO_FINANCE_ISSUES_COLUMN_LAST_COMMENT: string;
  WGO_FINANCE_ISSUES_COLUMN_CREATED_AT: string;
  WGO_FINANCE_ISSUES_COLUMN_CLOSED_AT: string;
  [WGO_FINANCE_ISSUES_COLUMN_START_DATE]: string;
  [WGO_FINANCE_ISSUES_COLUMN_END_DATE]: string;
  WGO_FINANCE_ISSUES_GO_TO_GITHUB_BTN: string;
  WGO_FINANCE_ISSUES_CREATE_ACCOUNTING_BTN: string;
}

export const TranslationsKeys = {
  WGO_FINANCE_ISSUES_TITLE: true,
  WGO_FINANCE_ISSUES_TITLE_BC: true,
  WGO_FINANCE_ISSUES_FILTER_TITLE: true,
  WGO_FINANCE_ISSUES_COLUMN_TITLE: true,
  WGO_FINANCE_ISSUES_COLUMN_DESCRIPTION: true,
  [WGO_FINANCE_ISSUES_COLUMN_STATUS]: true,
  WGO_FINANCE_ISSUES_COLUMN_STATUS_PENDING: true,
  WGO_FINANCE_ISSUES_COLUMN_STATUS_ACCOUNTED: true,
  [WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO]: true,
  [WGO_FINANCE_ISSUES_COLUMN_LABEL]: true,
  [WGO_FINANCE_ISSUES_COLUMN_REPOSITORY]: true,
  WGO_FINANCE_ISSUES_COLUMN_HOURS: true,
  WGO_FINANCE_ISSUES_COLUMN_LAST_COMMENT: true,
  WGO_FINANCE_ISSUES_COLUMN_CREATED_AT: true,
  WGO_FINANCE_ISSUES_COLUMN_CLOSED_AT: true,
  [WGO_FINANCE_ISSUES_COLUMN_START_DATE]: true,
  [WGO_FINANCE_ISSUES_COLUMN_END_DATE]: true,
  WGO_FINANCE_ISSUES_GO_TO_GITHUB_BTN: true,
  WGO_FINANCE_ISSUES_CREATE_ACCOUNTING_BTN: true
};
