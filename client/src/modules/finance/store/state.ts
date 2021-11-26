import {
  AccountRecord,
  BillRecord,
  Dictionary,
  DictionaryNumber,
  ExpenseRecord,
  IncomeRecord,
  IndexContentModel,
  IssuesRecord,
  OptionFilter,
  OrganizationDataRecord,
  ProductRecord,
  TransactionRecord
} from '../models/models';

export interface GithubStateInterface {
  issues: IssuesRecord[];
  projects: OptionFilter[];
  repositories: OptionFilter[];
  labels: OptionFilter[];
  milestones: OptionFilter[];
  collaborators: Dictionary[];
  accounting: AccountRecord[];
  transactions: TransactionRecord[];
  expenses: ExpenseRecord[];
  incomes: IncomeRecord[];
  organizationData: OrganizationDataRecord | null;
  homeProps: DictionaryNumber;
  products: ProductRecord[];
  bills: BillRecord[];
  indexContent: IndexContentModel | null;
}

const state = (): GithubStateInterface => {
  return {
    issues: [],
    collaborators: [],
    labels: [],
    milestones: [],
    projects: [],
    repositories: [],
    accounting: [],
    transactions: [],
    expenses: [],
    incomes: [],
    organizationData: null,
    homeProps: {},
    products: [],
    bills: [],
    indexContent: null
  };
};

export default state;
