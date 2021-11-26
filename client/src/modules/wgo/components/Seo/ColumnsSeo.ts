import { ColumnLanguageTable } from '../../models/IColumn';
import { ITranslationSeoKeys } from './TranslationsKeys';

export const nameSeoField: ColumnLanguageTable = {
  name: 'nameSeo',
  required: true,
  label: 'Name',
  align: 'left',
  field: 'name',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const valueSeoField: ColumnLanguageTable = {
  name: 'valueSeo',
  required: true,
  label: 'Value',
  align: 'left',
  field: 'value',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const buttonSeoField: ColumnLanguageTable = {
  name: 'buttonsSeo',
  label: '',
  align: '',
  style: 'max-width: 100px'
};

export const ColumnsSeo = [nameSeoField, valueSeoField, buttonSeoField];

export const setColumnsLanguage = (translations: ITranslationSeoKeys) => {
  // nameSeoField.label = translations.WGO_SEO_COLUMN_NAME_LABEL;
  // valueSeoField.label = translations.WGO_SEO_COLUMN_VALUE_LABEL;
};
