import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
  historicTranslations,
} from "@wisegar-org/wgo-base-models";
import { TranslationStore } from "../../../translation/store/TranslationStore";
export const getHistoricListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  return {
    schema: {
      id: {
        name: "id",
        label: historicTranslations.COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      entity: {
        name: "entity",
        label: historicTranslations.COLUMN_ENTITY,
        field: "entity",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
        nonTranslate: true,
      },
      action: {
        name: "action",
        label: historicTranslations.COLUMN_ACTION,
        field: "action",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
        nonTranslate: true,
      },
      creatoIl: {
        name: "creatoIl",
        label: historicTranslations.COLUMN_CREATE_AT,
        field: "creatoIl",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      message: {
        name: "message",
        label: historicTranslations.COLUMN_MESSAGE,
        field: "message",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      username: {
        name: "username",
        label: historicTranslations.COLUMN_USERNAME,
        field: "username",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      commands: {
        name: "commands",
        label: "",
        field: "commands",
        sortable: false,
        visible: true,
        filterable: false,
        required: true,
        align: "right",
        type: "iconCommands",
        extra: rowButtons,
      },
    },
    code: "id",
    text: ["nome"],
    description: [],
    title: "",
    leftButtons: leftButtons,
    translationStore: transStore,
    disableExportExcel: true,
    disableExportCsv: true,
    disableCopyClipboard: true,
    disableSelectColumns: true,
    searchStrategy: {
      type: "header",
    },
  };
};
