import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { translations } from '../translations';
import { ITableSchema, ITableLeftButton, ITableRowButton } from '@wisegar-org/wgo-base-models/build/core/Table';
export const getEmployeesListSchema = (
  tranStore: TranslationStore,
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
        label: translations.NAME,
        field: 'name',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      email: {
        name: 'email',
        label: translations.EMAIL,
        field: 'email',
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
    title: translations.TITLE,
    leftButtons: leftButtons,
    translationStore: tranStore as any,
    searchStrategy: {
      type: 'header',
    },
  };
};
