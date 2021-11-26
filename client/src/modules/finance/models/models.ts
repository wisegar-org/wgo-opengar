import { FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-core-ui';
import { MediaResponseGql } from 'src/graphql';
import { IColumn } from 'src/modules/wgo/models/IColumn';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export type Dictionary = {
  [key: string]: string;
};

export type DictionaryNumber = {
  [key: string]: number;
};

export interface Issue {
  number: number;
  title: string;
  assignedTo: string;
  status: string;
  labels: string;
  project: string;
  milestones: string;
}

export type AccountRecordKeys =
  | 'id'
  | 'number'
  | 'date'
  | 'total_hours'
  | 'total_issues';
export interface ColumnAccountTable extends IColumn {
  field?: ((row: AccountRecord) => string) | AccountRecordKeys;
}

export type CollaboratorRecordKeys = 'id' | 'login' | 'url' | 'name';
export interface ColumnCollaboratorsTable extends IColumn {
  field?: ((row: CollaboratorRecord) => string) | CollaboratorRecordKeys;
}

export interface ColumnTable extends IColumn {
  field: ((row: IssuesRecord) => string) | IssuesRecordKeys;
}

export interface OptionFilter {
  id: number;
  title: string;
  label: string;
  isCollaborator?: boolean;
}

export interface FilterIssuesModel {
  milestones: null | OptionFilter;
  labels: null | OptionFilter;
  project: null | OptionFilter;
  assignedTo: null | OptionFilter;
  repository: null | OptionFilter;
  minDate: null | string;
  maxDate: null | string;
}

export type IssuesRecordKeys =
  | 'milestones'
  | 'labels'
  | 'project'
  | 'assignedTo'
  | 'id'
  | 'number'
  | 'title'
  | 'status'
  | 'hours'
  | 'repository';

export type FiltersIsuesKeys =
  | 'milestones'
  | 'labels'
  | 'project'
  | 'assignedTo'
  | 'repository';

export interface FiltersItemList {
  prop: FiltersIsuesKeys;
  column: ColumnTable;
  contain: boolean;
}

export interface IssuesResponseData {
  issues?: IssuesRecord[];
}

export interface IssuesFilterResponseData {
  milestones?: OptionFilter[];
  labels?: OptionFilter[];
  projects?: OptionFilter[];
  collaborators?: OptionFilter[];
  repositories?: OptionFilter[];
  update?: boolean;
}

export interface IssuesResponse {
  data: IssuesResponseData;
}

export interface IssuesFilterResponse {
  data: IssuesFilterResponseData;
}
export interface AccountDataResponse {
  accounts?: AccountRecord[];
  created?: boolean;
  updated?: boolean;
}
export interface AccountResponse {
  data: AccountDataResponse;
}
export interface AccountRecord {
  id: number;
  date: Date;
  total_issues: number;
  total_hours: number;
  total_projects: number;
  total_repos: number;
  contributor: Dictionary;
  issues?: IssuesRecord[];
  projects?: OptionFilter[];
  repos?: OptionFilter[];
  pay_by_hours: number;
  pay_to_internet: number;
  taxes: number;
  details: string;
  payment_comment: string;
  payment_code: string;
  internet_cost: number;
  status: number;
  initDate: string;
  endDate: string;
  value: number;
}

export interface WeeklyStats {
  week_number: number;
  weekly: string;
  count_task: number;
  hours: number;
  average: number;
}

export interface ColumnStatsCollaboratorTable extends IColumn {
  field: ((row: WeeklyStats) => string) | string;
}

export interface CollaboratorsDataResponse {
  collaborators?: CollaboratorRecord[];
  update?: boolean;
  created?: boolean;
  stats?: WeeklyStats[];
}
export interface CollaboratorsResponse {
  data: CollaboratorsDataResponse;
}

export interface CollaboratorRecord {
  name: string;
  avatar_url: string;
  card_number: string;
  id: number;
  login: string;
  node_id: string;
  pay_by_hours: number;
  // pay_to_internet: number;
  url: string;
  email: string;
  address: string;
  cap: string;
  place: string;
  bio: string;
  isCollaborator: boolean;
}
export interface IssuesRecord {
  assignedTo: {
    login: string;
  };
  description: string;
  assignedToId: number;
  number: number;
  milestones: string;
  labels: string;
  last_comment: string;
  created_at: string;
  closed_at: string;
  project: {
    title: string;
    id: number;
  };
  repository: {
    title: string;
    id: number;
  };
  id: number | '';
  title: string;
  status: string;
  hours: number | '';
  url: string;
}

export interface AddAccountParams {
  issuesId: number[];
  reposId: number[];
  projectsId: number[];
  hours: number;
  collaboratorId: number;
  pay_by_hours: number;
  pay_to_internet: number;
  taxes: number;
  details: string;
  payment_comment: string;
  payment_code: string;
  internet_cost: number;
  initDate: string;
  endDate: string;
}

export interface EditCollaboratorAccountParams {
  id: number;
  name: string;
  card_number: string;
  pay_by_hours: number;
  // pay_to_internet: number;
  email: string;
  address: string;
}

export interface OrganizationDataRecord {
  name: string;
  description: string;
  address: string;
  place: string;
  phone: string;
  cap: number;
  email: string;
  web: string;
  no: string;
  accountingInternetPrice: number;
  accountingUnit: string;
  accountingCoin: string;
  accountingLabel: string;
  bankName: string;
  bankBIC: string;
  bankIBAN: string;
  bankNo: string;
  bankCap: string;
  bankPlace: string;
  bankAddress: string;
  bankValidDays: number;
}

export interface OrganizationDataResponse {
  organizationData?: OrganizationDataRecord;
  update?: boolean;
}
export interface OrganizationResponse {
  data: OrganizationDataResponse;
}

export interface TransactionRecord {
  collaborator: Dictionary;
  collaboratorId: number;
  status: string;
  card_balance: number;
  cost: number;
  date: Date;
  type: string;
  idTransaction: string;
}

export type TransactionRecordKeys =
  | 'collaborator'
  | 'status'
  | 'card_balance'
  | 'cost'
  | 'date';

export interface ColumnTransactionTable extends IColumn {
  field: ((row: TransactionRecord) => string) | TransactionRecordKeys;
}

export interface TransactionDataResponse {
  transactions?: TransactionRecord[];
  update?: boolean;
  created?: boolean;
}
export interface TransactionResponse {
  data: TransactionDataResponse;
}

export interface ExpenseRecord {
  id: number;
  name: string;
  description: string;
  cost: number;
  date: Date;
  status: number;
  collaborator: Dictionary;
  collaboratorId: number;
  repeat: FrequencyRepeatEnum;
  bildDocs: MediaListRow[] | number[];
}

export type ExpenseRecordKeys =
  | 'name'
  | 'description'
  | 'cost'
  | 'date'
  | 'status'
  | 'repeat';

export interface ColumnExpenseTable extends IColumn {
  field: ((row: ExpenseRecord) => string) | ExpenseRecordKeys;
}

export interface ExpenseDataResponse {
  expenses?: ExpenseRecord[];
  updated?: boolean;
  created?: boolean;
}
export interface ExpenseResponse {
  data: ExpenseDataResponse;
}

export interface MediaListRow {
  id: number;
  fileName?: string;
  type?: string;
  displayName?: string;
}

export type MediaListKeys = 'id' | 'fileName' | 'type' | 'displayName';

export interface ColumnMediaList extends IColumn {
  field?: ((row: MediaListRow) => string) | MediaListKeys;
}

export interface MediaResponseData {
  items?: MediaListRow[];
  created?: boolean;
  deleted?: boolean;
}

export interface GetMediaResponseData {
  type: string;
  data: Buffer;
}

export interface MediaResponse<T> {
  data: T;
}

export interface IncomeRecord {
  id: number;
  name: string;
  description: string;
  amount: number;
  date: Date;
  status: number;
  repeat: FrequencyRepeatEnum;
  collaborator: Dictionary;
  collaboratorId: number;
  invoiceDocs: MediaListRow[] | number[];
}

export type IncomeKeys =
  | 'id'
  | 'description'
  | 'name'
  | 'amount'
  | 'date'
  | 'repeat';

export interface ColumnIncomeTable extends IColumn {
  field?: ((row: IncomeRecord) => string) | IncomeKeys;
}

export interface IncomeDataResponse {
  incomes?: IncomeRecord[];
  updated?: boolean;
  created?: boolean;
}
export interface IncomeResponse {
  data: IncomeDataResponse;
}

export interface FilterIncomeObj {
  minDate: string | undefined;
  maxDate: string | undefined;
  repeat: FrequencyRepeatEnum | undefined;
  client: string | undefined;
}

export interface CollaboratorFilter {
  collaborator: CollaboratorRecord;
  type: Dictionary;
}

export interface ProductRecord {
  id: number;
  name: string;
  description: string;
  buyPrice: number;
  sellPrice: number;
  unitCount: number;
  type: number;
  docs: MediaListRow[] | number[];
}

export interface ProductFilter {
  type?: { value: number; label: string };
  name: string;
}

export type ProductKeys =
  | 'id'
  | 'description'
  | 'name'
  | 'buyPrice'
  | 'sellPrice'
  | 'type'
  | 'unitCount';

export interface ColumnProductTable extends IColumn {
  field?: ((row: ProductRecord) => string) | ProductKeys;
}

export interface ProductDataResponse {
  products?: ProductRecord[];
  updated?: boolean;
  created?: boolean;
}
export interface ProductResponse {
  data: ProductDataResponse;
}

export interface ProductsBill {
  productId: number;
  product: ProductRecord;
  price: number;
  count: number;
  maxCount: number;
  remove: boolean;
  type: number;
}

export interface ColumnProductsBillTable extends IColumn {
  field?: (row: ProductsBill) => string;
}

export interface BillRecord {
  id: number;
  name: string;
  description: string;
  totalPrice: number;
  totalWithDiscount: number;
  clientId: number;
  date: Date;
  sendDate: Date;
  discount: number;
  observations: string;
  status: number;
  validDays: number;
  client: CollaboratorRecord;
  products: ProductsBill[];
  docs: MediaListRow[] | number[];
}

export interface BillFilter {
  status?: { value: number; label: string };
  client: string;
}

export type BillKeys =
  | 'id'
  | 'name'
  | 'description'
  | 'totalPrice'
  | 'clientId';

export interface ColumnBillTable extends IColumn {
  field?: ((row: BillRecord) => string) | BillKeys;
}

export interface BillDataResponse {
  bills?: BillRecord[];
  updated?: boolean;
  created?: boolean;
}
export interface BillResponse {
  data: BillDataResponse;
}

export interface TemplateStyle {
  body: string;
  defaultTemplate: boolean;
  documentType: string;
  entityTemplate: string;
  id: number;
  title: string;
}

export interface TemplateHTML {
  body: string;
  defaultTemplate: boolean;
  documentType: string;
  entityTemplate: string;
  id: number;
  styleTemplate: TemplateStyle;
  styleTemplateId: number;
  title: string;
}

export interface IndexContentModel {
  image?: MediaResponseGql;
}

export interface StorageModuleItemContent {
  name: string;
  description: string;
  nameKey: string;
  descriptionKey: string;
  path: string;
}
export interface StorageModuleItem {
  id: number;
  type: string;
  content: StorageModuleItemContent;
  image?: MediaResponseGql;
}

export interface StorageModulePageModel {
  storageItemsCount: number;
  storageItems: StorageModuleItem[];
}