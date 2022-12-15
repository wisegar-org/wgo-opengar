import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { ITableSchema, ITableLeftButton, ITableRowButton } from '@wisegar-org/wgo-base-models';
import { translations } from './translations';

export const getEmailMediaListSchema = (
  tranStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  //     id: number;
  //   name: string;
  //   senderTo: string;
  //   senderFrom: string;
  //   fileName: string;
  //   fileExt: string;
  //   isPublic: boolean;
  //   contentId: string;
  //   contentType: string;
  //   size: number;
  //   emailId: number;
  return {
    schema: {
      id: {
        name: 'id',
        label: translations.COLUMN_ID,
        field: 'id',
        sortable: true,
        visible: false,
        filterable: true,
        align: 'left',
        width: 100,
      },
      name: {
        name: 'name',
        label: translations.COLUMN_NAME,
        field: 'name',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      senderFrom: {
        name: 'senderFrom',
        label: translations.COLUMN_SENDER_FORM,
        field: 'senderFrom',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      senderTo: {
        name: 'senderTo',
        label: translations.COLUMN_SENDER_TO,
        field: 'senderTo',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      contentType: {
        name: 'contentType',
        label: translations.COLUMN_CONTENT_TYPE,
        field: 'contentType',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'left',
        width: 200,
      },
      size: {
        name: 'size',
        label: translations.COLUMN_SIZE,
        field: 'size',
        sortable: true,
        visible: true,
        filterable: true,
        align: 'right',
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
    translationStore: tranStore,
    searchStrategy: {
      type: 'header',
    },
  };
};
