import { ColumnMediaList } from '../../../finance/models/models';

export const fileNameMediaListField: ColumnMediaList = {
  name: 'fileName',
  required: true,
  label: 'Name',
  align: 'left',
  field: 'displayName',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const buttonMediaListField: ColumnMediaList = {
  name: 'buttons',
  label: '',
  align: '',
  style: 'max-width: 100px'
};

export const ColumnsMediaList = [fileNameMediaListField, buttonMediaListField];
