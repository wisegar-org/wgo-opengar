import { IndexContentModel } from 'src/modules/finance/models/models';
import { MutationTree } from 'vuex';
import {
  AccountRecord,
  BillRecord,
  Dictionary,
  DictionaryNumber,
  ExpenseRecord,
  IncomeRecord,
  IssuesRecord,
  OptionFilter,
  OrganizationDataRecord,
  ProductRecord,
  TransactionRecord
} from '../models/models';
import { GithubStateInterface } from './state';

export const githubMutations = {
  setIssues: 'setIssues',
  setProjects: 'setProjects',
  setRepositories: 'setRepositories',
  setLabels: 'setLabels',
  setMilestones: 'setMilestones',
  setCollaborators: 'setCollaborators',
  setTransactions: 'setTransactions',
  setAccounting: 'setAccounting',
  setExpenses: 'setExpenses',
  setIncomes: 'setIncomes',
  setOrganizationData: 'setOrganizationData',
  setHomeProps: 'setHomeProps',
  setProducts: 'setProducts',
  setBills: 'setBills',
  setIndexContent: 'setIndexContent'
};

export const getGithubMutations = () => {
  const mutations: MutationTree<GithubStateInterface> = {
    setIssues(state, issues: IssuesRecord[]) {
      state.issues = issues;
    },
    setProjects(state, projects: OptionFilter[]) {
      state.projects = projects;
    },
    setRepositories(state, repositories: OptionFilter[]) {
      state.repositories = repositories;
    },
    setLabels(state, labels: OptionFilter[]) {
      state.labels = labels;
    },
    setMilestones(state, milestones: OptionFilter[]) {
      state.milestones = milestones;
    },
    setCollaborators(state, collaborators: Dictionary[]) {
      state.collaborators = collaborators;
    },
    setTransactions(state, transactions: TransactionRecord[]) {
      state.transactions = transactions;
    },
    setAccounting(state, accounting: AccountRecord[]) {
      state.accounting = accounting;
    },
    setExpenses(state, expenses: ExpenseRecord[]) {
      state.expenses = expenses;
    },
    setIncomes(state, incomes: IncomeRecord[]) {
      state.incomes = incomes;
    },
    setOrganizationData(state, organizationData: OrganizationDataRecord) {
      state.organizationData = organizationData;
    },
    setHomeProps(state, homeProps: DictionaryNumber) {
      state.homeProps = homeProps;
    },
    setProducts(state, products: ProductRecord[]) {
      state.products = products;
    },
    setBills(state, bills: BillRecord[]) {
      state.bills = bills;
    },
    setIndexContent(state, indexContent: IndexContentModel) {
      state.indexContent = indexContent
    }
  };

  return mutations;
};
