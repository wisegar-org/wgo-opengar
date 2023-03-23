import { ITranslations } from '../../../../wgo/models';

export const TranslationIndexPageTitleKey = 'WGO_FINANCE_INDEX_TITLE';
export const TranslationIndexContentKey = 'WGO_FINANCE_INDEX_CONTENT_TEXT';
export const TranslationIndexPageFooterKey = 'WGO_FINANCE_INDEX_FOOTER_LABEL';

export interface ITranslationIndexContentKeys extends ITranslations {
  FINANCE_INDEX_CONTENT_TITLE: string;
  FINANCE_INDEX_CONTENT_TITLE_BC: string;
  [TranslationIndexPageTitleKey]: string;
  [TranslationIndexContentKey]: string;
  [TranslationIndexPageFooterKey]: string;
  FINANCE_INDEX_CONTENT_SUCCESS_EDIT: string;
  FINANCE_INDEX_CONTENT_FAIL_EDIT: string;
}

export const TranslationsKeys = {
  FINANCE_INDEX_CONTENT_TITLE: true,
  FINANCE_INDEX_CONTENT_TITLE_BC: true,
  [TranslationIndexPageTitleKey]: true,
  [TranslationIndexContentKey]: false,
  [TranslationIndexPageFooterKey]: true,
  FINANCE_INDEX_CONTENT_SUCCESS_EDIT: true,
  FINANCE_INDEX_CONTENT_FAIL_EDIT: true
};
