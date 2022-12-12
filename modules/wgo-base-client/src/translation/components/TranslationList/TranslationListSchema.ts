import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
  transTranslations,
} from "@wisegar-org/wgo-base-models";
import { TranslationStore } from "../../store/TranslationStore";
export const getTranslationListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  // id: string;
  // key: string;
  // value: string;
  // languageId: number;
  return {
    schema: {
      id: {
        name: "id",
        label: transTranslations.COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      key: {
        name: "key",
        label: transTranslations.COLUMN_KEY,
        field: "key",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 300,
        nonTranslate: true,
      },
      value: {
        name: "value",
        label: transTranslations.COLUMN_VALUE,
        field: "value",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
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
    title: "Email media",
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
