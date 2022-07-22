import { TranslationStore } from "../../../translation/models/TranslationStore";

export interface ITableExport {
  align?: { vertical: string; horizontal: string };
  format?: { type: string; mask: string };
  disable?: boolean;
}

export interface ITableColumn {
  name: string;
  label: string;
  field: string | any;
  sortable: boolean;
  visible: boolean;
  filterable: boolean;
  align: string;
  headerStyle?: string | null;
  required?: boolean;
  style?: string;
  nonTranslate?: boolean;
  cellClass?: (row: any) => string | undefined;
  width?: number;
  type?:
    | "menu"
    | "avatar"
    | "badges"
    | "icon"
    | "iconCommands"
    | "iconsState"
    | "date"
    | "decimal";
  extra?: unknown;
  format?: (val: unknown, row?: number) => string;
  export?: ITableExport;
}

export interface ITableData {
  [key: string]: string | number | ITableColumn;
}

export interface ITableLeftButton {
  label?: string;
  tooltip?: string;
  icon: string;
  color: string;
  action?: string;
  fnAction?: any;
}

export interface ITableRowButton {
  label?: string;
  icon: string;
  tooltip?: string;
  fnAction: any;
  grouped?: boolean;
}

export interface ITableSearchStrategy {
  type: string;
  visible?: boolean;
}

export interface ITableSchema {
  schema: { [key: string]: ITableColumn };
  translationStore?: TranslationStore;
  apiURL?: string;
  code?: string;
  displayedCode?: string;
  text?: string[] | ((row: any) => string);
  description?: string[] | ((row: any) => string);
  side?: string[] | ((row: any) => string);
  sideClass?: (row: any) => string | undefined;
  avatarValue?: string | ((row: any) => string);
  avatarColor?: (val: string) => string;
  title: string;
  disableFullscreen?: boolean;
  disableSelectColumns?: boolean;
  disableExportCsv?: boolean;
  disableExportExcel?: boolean;
  disableCopyClipboard?: boolean;
  leftButtons?: ITableLeftButton[];
  searchStrategy?: ITableSearchStrategy;
  leadingZeros?: number;
  codeWidth?: number;
  exportTitle?: string;
  rowsPerPage?: number[];
  rowsPerPageDefault?: number;
  rowClass?: (row: any) => string | undefined;
  rowDblClick?: (row: any) => unknown;
}
