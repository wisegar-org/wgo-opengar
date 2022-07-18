import {
  ITableSchema,
  ITableLeftButton,
  ITableRowButton,
} from "../../../core/models/Table";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import { ISettingsModel } from "../../models";
import { translations } from "../../models/translations";

export const getSettingsListSchema = (
  tranStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  // id: number;
  // code: string;
  // enabled: boolean;
  // default boolean;
  return {
    schema: {
      key: {
        name: "key",
        label: translations.COLUMN_KEY,
        field: (row: ISettingsModel) => `WGO_SETTINGS_${row.key}`,
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      value: {
        name: "value",
        label: translations.COLUMN_VALUE,
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
    code: "key",
    text: ["key"],
    description: [],
    title: translations.TITLE,
    leftButtons: leftButtons,
    translationStore: tranStore,
    searchStrategy: {
      type: "header",
    },
  };
};
