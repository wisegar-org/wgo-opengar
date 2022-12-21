import { StorageDoctorItem } from 'src/models/StorageModels';
import { ITableLeftButton, ITableRowButton, ITableSchema } from '@wisegar-org/wgo-base-models/build/core/Table';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { translationsDoctorsContent } from '../../../models/translations';

export const getDoctorsListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  // title: string;
  // description: string;
  // titleKey: string;
  // descriptionKey: string;
  return {
    schema: {
      id: {
        name: 'id',
        label: translationsDoctorsContent.COLUMN_ID,
        field: 'id',
        sortable: true,
        visible: false,
        filterable: true,
        align: 'left',
        width: 100,
      },
      name: {
        name: 'name',
        label: translationsDoctorsContent.COLUMN_TITLE,
        field: (row: StorageDoctorItem) => row.content.name,
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      description: {
        name: 'description',
        label: translationsDoctorsContent.COLUMN_DESCRIPTION,
        field: (row: StorageDoctorItem) => row.content.description,
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      email: {
        name: 'email',
        label: translationsDoctorsContent.COLUMN_DESCRIPTION,
        field: (row: StorageDoctorItem) => row.content.email,
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
    text: ['name'],
    description: [],
    title: '',
    leftButtons: leftButtons,
    translationStore: transStore,
    disableCopyClipboard: true,
    disableExportCsv: true,
    disableExportExcel: true,
    disableFullscreen: true,
    disableSelectColumns: true,
    disableFilter: true,
    disableTitle: true,
    searchStrategy: {
      type: 'header',
    },
  };
};
