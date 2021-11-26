import { LanguageResponseGql } from 'src/graphql';

export interface IColumn {
  name: string;
  required?: boolean;
  label: string;
  align: string;
  sortable?: boolean;
  style?: string;
  classes?: string;
}

export interface ColumnLanguageTable extends IColumn {
  field?: ((row: LanguageResponseGql) => string) | string;
}
