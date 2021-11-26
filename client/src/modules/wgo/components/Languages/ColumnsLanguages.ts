import { LanguageResponseGql } from 'src/graphql';
import { ColumnLanguageTable } from '../../models/IColumn';
import { ITranslationLanguageKeys } from './TranslationsKeys';

export const codeLanguageField: ColumnLanguageTable = {
  name: 'nameLanguage',
  required: true,
  label: 'Code',
  align: 'left',
  field: 'code',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const logoLanguageField: ColumnLanguageTable = {
  name: 'logoLanguage',
  required: true,
  label: 'Logo',
  align: 'left',
  field: (record: LanguageResponseGql) => record.logo?.url || '',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const defaultLanguageField: ColumnLanguageTable = {
  name: 'defaultLanguage',
  required: true,
  label: 'Default',
  align: 'left',
  field: (record: LanguageResponseGql) =>
    record.default ? 'Enabled' : 'Disabled',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};
export const enabledLanguageField: ColumnLanguageTable = {
  name: 'enabledLanguage',
  required: true,
  label: 'Enabled',
  align: 'left',
  field: (record: LanguageResponseGql) =>
    record.enabled ? 'Enabled' : 'Disabled',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const buttonLanguageField: ColumnLanguageTable = {
  name: 'buttonsLanguage',
  label: '',
  align: '',
  style: 'max-width: 100px'
};

export const ColumnsLanguages = [
  logoLanguageField,
  codeLanguageField,
  defaultLanguageField,
  enabledLanguageField,
  buttonLanguageField
];

export const setColumnsLanguage = (translations: ITranslationLanguageKeys) => {
  logoLanguageField.label = translations.WGO_LANGUAGE_COLUMN_LOGO_LABEL;
  codeLanguageField.label = translations.WGO_LANGUAGE_COLUMN_CODE_LABEL;
  defaultLanguageField.label = translations.WGO_LANGUAGE_COLUMN_DEFAULT_LABEL;
  defaultLanguageField.field = (record: LanguageResponseGql) =>
    record.default
      ? translations.WGO_LANGUAGE_COLUMN_ENABLED_STATUS
      : translations.WGO_LANGUAGE_COLUMN_DISABLED_STATUS;
  enabledLanguageField.label = translations.WGO_LANGUAGE_COLUMN_ENABLED_LABEL;
  enabledLanguageField.field = (record: LanguageResponseGql) =>
    record.enabled
      ? translations.WGO_LANGUAGE_COLUMN_ENABLED_STATUS
      : translations.WGO_LANGUAGE_COLUMN_DISABLED_STATUS;
};
