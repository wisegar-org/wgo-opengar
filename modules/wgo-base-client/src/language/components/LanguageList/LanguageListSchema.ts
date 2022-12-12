import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
  languageTranslations,
  ILanguageModel,
} from "@wisegar-org/wgo-base-models";
import { TranslationStore } from "../../../translation/store/TranslationStore";

export const getLanguageListSchema = (
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
      id: {
        name: "id",
        label: languageTranslations.COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      code: {
        name: "code",
        label: languageTranslations.COLUMN_CODE,
        field: "code",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      enabled: {
        name: "enabled",
        label: languageTranslations.COLUMN_ENABLED,
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
        label: languageTranslations.COLUMN_DEFAULT,
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
    title: languageTranslations.TITLE,
    leftButtons: leftButtons,
    translationStore: tranStore,
    searchStrategy: {
      type: "header",
    },
  };
};
