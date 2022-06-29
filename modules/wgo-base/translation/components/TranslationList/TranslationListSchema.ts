import {
  ITableSchema,
  ITableLeftButton,
  ITableRowButton,
} from "../../../core/models/Table";
export const getTranslationListSchema = (
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
        label: "ID",
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      key: {
        name: "key",
        label: "Key",
        field: "key",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      value: {
        name: "value",
        label: "Value",
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
    searchStrategy: {
      type: "header",
    },
  };
};
