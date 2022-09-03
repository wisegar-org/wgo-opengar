import { TranslationStore } from 'app/../../wgo-base/translation/models/TranslationStore';
import { translations } from '../translations';
import { ITableSchema, ITableLeftButton, ITableRowButton } from '../../../wgo-base/core/models/Table';
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
        field: (row: any) => `${row.client_id.name} ${row.client_id.lastName}`,
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
        field: (row: any) => row.client_id.code,
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
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
