import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { translations } from '../translations';
import { ITableSchema, ITableLeftButton, ITableRowButton } from '@wisegar-org/wgo-base-models';
export const getImportEmployeesListSchema = (
  tranStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  return {
    schema: {
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
      lastName: {
        name: 'lastName',
        label: translations.LAST_NAME,
        field: 'lastName',
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
      code: {
        name: 'code',
        label: translations.CODE,
        field: 'code',
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
    code: 'code',
    text: ['name'],
    description: [],
    title: translations.TITLE,
    leftButtons: leftButtons,
    translationStore: tranStore as any,
    disableExportCsv: true,
    disableCopyClipboard: true,
    disableExportExcel: true,
    searchStrategy: {
      type: 'header',
    },
  };
};
