import { IsStringEmpty } from "@wisegar-org/wgo-object-extensions";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
  settingsTranslations,
  ISettingsModel,
} from "@wisegar-org/wgo-base-models";

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
        label: settingsTranslations.COLUMN_TYPE_SETTINGS,
        field: (row: ISettingsModel) => `WGO_SETTINGS_${row.type_settings}`,
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      setting: {
        name: "setting",
        label: settingsTranslations.COLUMN_SETTING,
        field: (row: ISettingsModel) => `WGO_SETTINGS_${row.key}`,
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      key: {
        name: "key",
        label: settingsTranslations.COLUMN_KEY,
        field: "key",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      value: {
        name: "value",
        label: settingsTranslations.COLUMN_VALUE,
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
              ? settingsTranslations.TRUE
              : settingsTranslations.FALSE;
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
    title: settingsTranslations.TITLE,
    leftButtons: leftButtons,
    translationStore: tranStore,
    searchStrategy: {
      type: "header",
    },
  };
};