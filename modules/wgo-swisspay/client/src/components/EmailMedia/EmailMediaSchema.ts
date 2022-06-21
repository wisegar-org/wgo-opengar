import {
  ITableSchema,
  ITableLeftButton,
  ITableRowButton,
} from "../../../../../wgo-base/core/models/Table";
export const getEmailMediaListSchema = (
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  //     id: number;
  //   name: string;
  //   senderTo: string;
  //   fileName: string;
  //   fileExt: string;
  //   isPublic: boolean;
  //   contentId: string;
  //   contentType: string;
  //   size: number;
  //   emailId: number;
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
        width: 50,
      },
      name: {
        name: "name",
        label: "Name",
        field: "name",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      senderTo: {
        name: "senderTo",
        label: "Sender To",
        field: "senderTo",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 200,
      },
      size: {
        name: "size",
        label: "Size",
        field: "size",
        sortable: true,
        visible: true,
        filterable: true,
        align: "right",
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
