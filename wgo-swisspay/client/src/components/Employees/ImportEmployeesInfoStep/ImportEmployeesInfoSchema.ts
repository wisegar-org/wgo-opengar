import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { translations } from '../translations';
import { ITableSchema, ITableLeftButton, ITableRowButton } from '@wisegar-org/wgo-base-models/build/core/Table';
export const getImportEmployeesInfoSchema = (
  tranStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  return {
    schema: {
      name: {
        name: 'name',
        label: translations.NAME,
        field: (row: any) => `${row.client.name} ${row.client.lastName}`,
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
        field: (row: any) => row.client.code,
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      confirmed: {
        name: 'confirmed',
        label: translations.WIZARD_IMPORT_CONFIRMED_COLUMN,
        field: 'confirmed',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
        format: (val: any, row?: any) => {
          return `${val}` === 'true'
            ? `${translations.WIZARD_IMPORT_CONFIRMED_CONFIRMED_VALUE}`
            : `${translations.WIZARD_IMPORT_CONFIRMED_UNCONFIRMED_VALUE}`;
        },
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
