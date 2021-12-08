export interface ListItem {
  [key: string]: unknown;
}

export interface PropToEdit {
  label: string;
  prop: string;
  tooltip?: string | ((item: ListItem) => string);
  type?: 'number' | 'text' | 'date' | 'select';
  value?: (item: ListItem) => string;
  options?: unknown;
  required?: boolean;
  visible?: boolean;
  class?: string;
}

export interface ExpandableListOptions {
  showAddBotton: boolean;
  labelShowAddBotton: string;
  textDeleteConfirm: string;
  editReactive?: boolean;
  editorStyle?: string;
  disableFullscreen?: boolean;
  disableExportExcel?: boolean;
  disableExportCSV?: boolean;
  disableExportClipboard?: boolean;
  disableFilters?: boolean;
  disableSelectColumns?: boolean;
  headerButtons?: {
    icon: string;
    tooltip: string;
    click: () => unknown;
  }[];
  expandedButtons?: {
    icon: string;
    tooltip: string;
    click: () => unknown;
  }[];
  onAddItem: (item: ListItem, callback: () => {}) => unknown;
  onEditItem: (item: ListItem, callback: () => {}) => unknown;
  onDeleteItem: (item: ListItem, index: number) => unknown;
  filterItems?: (items: ListItem[], filter: ListItem) => ListItem[];
}

export const DefaultExpandableListOptions: ExpandableListOptions = {
  showAddBotton: true,
  labelShowAddBotton: 'Nuovo',
  textDeleteConfirm: 'Confermi la cancellazione',
  disableFullscreen: false,
  disableExportExcel: false,
  disableExportCSV: false,
  disableExportClipboard: false,
  disableFilters: false,
  headerButtons: [],
  expandedButtons: [],
  onAddItem: (item: ListItem) => {},
  onEditItem: (item: ListItem) => {},
  onDeleteItem: (item: ListItem) => {}
};
