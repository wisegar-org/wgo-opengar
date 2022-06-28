import {
  ITableSchema,
  ITableLeftButton,
  ITableRowButton,
} from "../../../core/models/Table";
import { ILanguageModel } from "../../models";
export const getLanguageListSchema = (
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  // id: number;
  // code: string;
  // enabled: boolean;
  // default boolean;
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
      code: {
        name: "code",
        label: "Code",
        field: "code",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      enabled: {
        name: "enabled",
        label: "Enabled",
        field: (row: ILanguageModel) =>
          row.enabled ? "check_box" : "check_box_outline_blank",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
        type: "icon",
        extra: {
          tooltip: "Language enabled",
          color: "primary",
        },
      },
      default: {
        name: "default",
        label: "Default",
        field: (row: ILanguageModel) =>
          row.default ? "check_box" : "check_box_outline_blank",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
        type: "icon",
        extra: {
          tooltip: "Language default",
          color: "primary",
        },
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
