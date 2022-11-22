import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "src/wgo-base/core/models/Table";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import { translations } from "src/models/translations/events";
import { AgvEventResponseModel } from "src/models/models";

export const getEventListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  return {
    schema: {
      id: {
        name: "id",
        label: translations.COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      title: {
        name: "title",
        label: translations.COLUMN_TITLE,
        field: "title",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 150,
      },
      type: {
        name: "type",
        label: translations.COLUMN_TYPE,
        field: "type",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 50,
      },
      state: {
        name: "state",
        label: translations.COLUMN_STATE,
        field: "state",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 50,
      },
      visible: {
        name: "visible",
        label: translations.COLUMN_VISIBLE,
        field: (row: AgvEventResponseModel) =>
          row.visible ? "check_box" : "check_box_outline_blank",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        type: "icon",
        width: 50,
      },
      enrollment: {
        name: "enrollment",
        label: translations.COLUMN_ENROLLMENT,
        field: (row: AgvEventResponseModel) =>
          row.enrollment ? "check_box" : "check_box_outline_blank",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        type: "icon",
        width: 50,
      },
      class: {
        name: "class",
        label: translations.COLUMN_CLASS,
        field: "class",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 50,
      },
      inscriptions: {
        name: "inscriptions",
        label: translations.COLUMN_INSCRIPTIONS,
        field: "inscriptions",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 50,
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
    title: "Events",
    leftButtons: leftButtons,
    translationStore: transStore,
    searchStrategy: {
      type: "header",
    },
  };
};
