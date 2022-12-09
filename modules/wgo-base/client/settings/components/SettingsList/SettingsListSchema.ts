import { IsStringEmpty } from "@wisegar-org/wgo-object-extensions";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "../../../../models/core/Table";
import { ISettingsModel } from "../../../../models/settings";
import { translations } from "../../../../models/settings/translations";

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
      type_settings: {
        name: "type_settings",
        label: translations.COLUMN_TYPE_SETTINGS,
        field: (row: ISettingsModel) => `WGO_SETTINGS_${row.type_settings}`,
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      setting: {
        name: "setting",
        label: translations.COLUMN_SETTING,
        field: (row: ISettingsModel) => `WGO_SETTINGS_${row.key}`,
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      key: {
        name: "key",
        label: translations.COLUMN_KEY,
        field: "key",
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
        format: (val: any, row?: any) => {
          if (val.type === "password") {
            return IsStringEmpty(val.value) ? "••••••••" : "";
          } else if (val.type === "boolean") {
            return `${val.value}` === "true"
              ? translations.TRUE
              : translations.FALSE;
          }
          return val.value;
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