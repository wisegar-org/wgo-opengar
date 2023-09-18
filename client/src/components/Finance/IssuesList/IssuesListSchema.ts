import { translationsFinanceIssues } from "src/models/translations/finance";
import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";

export const getIssuesListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  //   id: number;
  //   owner: string;
  //   repo: string;
  //   title: string;
  //   status: string;
  //   hours: number;
  //   labels: string;
  //   milestones: string;
  //   last_comment?: string;
  //   created_at: Date;
  //   closed_at: Date;
  //   updated_at: Date;
  //   number: number;
  //   description: string;
  //   url: string;
  //   assignedToId?: number;
  //   assignedTo: IFinanceCollaboratorModel;
  //   projectId: number;
  //   project: IFinanceProjectModel;
  //   repositoryId: number;
  //   repository: IFinanceRepositoryModel;
  //   accountId: number | null;
  //   account: IFinanceAccountModel | null;
  return {
    schema: {
      id: {
        name: "id",
        label: translationsFinanceIssues.COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      title: {
        name: "title",
        label: translationsFinanceIssues.COLUMN_TITLE,
        field: "title",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      assignedToId: {
        name: "assignedToId",
        label: translationsFinanceIssues.COLUMN_ASSIGNED_TO,
        field: "assignedToId",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
        format: (val: any, row?: any) => {
          return row.assignedTo?.login || "-";
        },
      },
      status: {
        name: "status",
        label: translationsFinanceIssues.COLUMN_STATUS,
        field: "status",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      last_comment: {
        name: "last_comment",
        label: translationsFinanceIssues.COLUMN_LAST_COMMENT,
        field: "last_comment",
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
    text: ["title"],
    description: [],
    title: translationsFinanceIssues.TITLE,
    leftButtons: leftButtons,
    translationStore: transStore,
    disableFullscreen: true,
    disableFilter: true,
    searchStrategy: {
      type: "header",
    },
  };
};
