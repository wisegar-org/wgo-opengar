import { ITableSchema, ITableLeftButton, ITableRowButton } from '../../../../../wgo-base/core/models/Table';
export const getEmployeesListSchema = (
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  //     id: number;
  return {
    schema: {
      id: {
        name: 'id',
        label: 'ID',
        field: 'id',
        sortable: true,
        visible: false,
        filterable: true,
        align: 'left',
        width: 100,
      },
      name: {
        name: 'name',
        label: 'Name',
        field: 'name',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      commands: {
        name: 'commands',
        label: '',
        field: 'commands',
        sortable: false,
        visible: true,
        filterable: false,
        required: true,
        align: 'right',
        type: 'iconCommands',
        extra: rowButtons,
      },
    },
    code: 'id',
    text: ['nome'],
    description: [],
    title: 'Employees',
    leftButtons: leftButtons,
    searchStrategy: {
      type: 'header',
    },
  };
};
