import { GetterTree } from 'vuex';
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
import { GithubStateInterface } from './state';

export const githubGetters = {
  getIssues: 'getIssues',
  getProjects: 'getProjects',
  getRepositories: 'getRepositories',
  getLabels: 'getLabels',
  getMilestones: 'getMilestones',
  getCollaborators: 'getCollaborators',
  getAccounting: 'getAccounting',
  getOrganizationData: 'getOrganizationData',
  getTransactions: 'getTransactions',
  getExpenses: 'getExpenses',
  getIncomes: 'getIncomes',
  getHomeProps: 'getHomeProps',
  getProducts: 'getProducts',
  getBills: 'getBills',
  getIndexContent: 'getIndexContent'
};

export const getGithubGetters = (StateInterface: any) => {
  const getters: GetterTree<GithubStateInterface, typeof StateInterface> = {
    getIssues(state): IssuesRecord[] {
      return state.issues;
    },
    getProjects(state): OptionFilter[] {
      return state.projects;
    },
    getRepositories(state): OptionFilter[] {
      return state.repositories;
    },
    getLabels(state): OptionFilter[] {
      return state.labels;
    },
    getMilestones(state): OptionFilter[] {
      return state.milestones;
    },
    getCollaborators(state): Dictionary[] {
      return state.collaborators;
    },
    getAccounting(state): AccountRecord[] {
      return state.accounting;
    },
    getOrganizationData(state): OrganizationDataRecord | null {
      return state.organizationData;
    },
    getTransactions(state): TransactionRecord[] {
      return state.transactions;
    },
    getExpenses(state): ExpenseRecord[] {
      return state.expenses;
    },
    getIncomes(state): IncomeRecord[] {
      return state.incomes;
    },
    getHomeProps(state): DictionaryNumber {
      return state.homeProps;
    },
    getProducts(state): ProductRecord[] {
      return state.products;
    },
    getBills(state): BillRecord[] {
      return state.bills;
    },
    getIndexContent(state): IndexContentModel | null {
      return state.indexContent
    }
  };

  return getters;
};
