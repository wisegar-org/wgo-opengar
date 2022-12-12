import {
  authTranslations,
  IUser,
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "@wisegar-org/wgo-base-models";
import { TranslationStore } from "../../../translation/store/TranslationStore";

export const getAuthUserListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  // id: number;
  // name: string;
  // lastName: string;
  // userName: string;
  // email: string;
  // isEmailConfirmed: boolean;
  // roles: string[];
  // code: string;
  // certificate: string;
  return {
    schema: {
      id: {
        name: "id",
        label: authTranslations.COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      name: {
        name: "name",
        label: authTranslations.COLUMN_NAME,
        field: "name",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      lastName: {
        name: "lastName",
        label: authTranslations.COLUMN_LAST_NAME,
        field: "lastName",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      userName: {
        name: "userName",
        label: authTranslations.COLUMN_USER_NAME,
        field: "userName",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 200,
      },
      email: {
        name: "email",
        label: authTranslations.COLUMN_EMAIL,
        field: "email",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      roles: {
        name: "roles",
        label: authTranslations.COLUMN_ROLES,
        field: "roles",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
        type: "badges",
        extra: {
          SUPERADMIN: "red",
        },
      },
      isEmailConfirmed: {
        name: "isEmailConfirmed",
        label: authTranslations.COLUMN_IS_CONFIRMED_EMAIL,
        field: (row: IUser) =>
          row.isEmailConfirmed ? "check_box" : "check_box_outline_blank",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
        type: "icon",
        extra: {
          tooltip: authTranslations.COLUMN_IS_CONFIRMED_EMAIL,
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
    translationStore: transStore,
    searchStrategy: {
      type: "header",
    },
  };
};