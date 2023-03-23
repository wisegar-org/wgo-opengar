import { IssuesService } from '../services/IssuesService';
import { AccountService } from '../services/AccountService';
import { ActionTree } from 'vuex';
import { GithubStateInterface } from './state';
import { githubMutations } from './mutations';
import { ExpenseService } from '../services/ExpensesService';
import { IncomesService } from '../services/IncomesService';
import { getGithubIssuesActions, issuesActions } from './actions/issuesActions';
import {
  accountingActions,
  getGithubAccountingActions
} from './actions/accountigActions';
import {
  getGithubTransactionsActions,
  transactionsActions
} from './actions/transactionsActions';
import {
  expensesActions,
  getGithubExpensesActions
} from './actions/expensesActions';
import {
  getGithubIncomesActions,
  incomesActions
} from './actions/incomesActions';
import {
  getGithubOrganizationActions,
  organizationActions
} from './actions/organizationActions';
import { getGithubMediaActions, mediaActions } from './actions/mediaActions';
import {
  collaboratorActions,
  getGithubCollaboratorActions
} from './actions/collaboratorActions';
import {
  getGithubProductsActions,
  productsActions
} from './actions/productActions';
import { billsActions, getGithubBillsActions } from './actions/billActions';
import { IndexService } from '../services/IndexService';
import { ServiceProvider } from '@wisegar-org/wgo-opengar-core-ui';
import { FinanceIndexContentInputsGql, StorageAllInputGql, StorageInputGql, StoragePageInputGql } from 'src/graphql';
import { StorageService } from 'src/modules/wgo/services/StorageService';
import { StorageModuleItem, StorageModuleItemContent, StorageModulePageModel } from '../models/models';

export const githubActions = {
  ...issuesActions,
  ...accountingActions,
  ...transactionsActions,
  ...expensesActions,
  ...incomesActions,
  ...organizationActions,
  ...mediaActions,
  ...collaboratorActions,
  ...productsActions,
  ...billsActions,
  cleanStoreGithub: 'cleanStoreGithub',
  loadHomeData: 'loadHomeData',
  getHomeContent: 'getHomeContent',
  loadIndexContent: 'loadIndexContent',
  setIndexContent: 'setIndexContent',
  getModules: 'getModules',
  getModulesByPagination: 'getModulesByPagination'
};

const indexService: IndexService = ServiceProvider.GetScoped(
  IndexService
);
const storageService: StorageService = ServiceProvider.GetScoped(
  StorageService
);

export const getGithubActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    ...getGithubIssuesActions(StateInterface),
    ...getGithubAccountingActions(StateInterface),
    ...getGithubTransactionsActions(StateInterface),
    ...getGithubExpensesActions(StateInterface),
    ...getGithubIncomesActions(StateInterface),
    ...getGithubMediaActions(StateInterface),
    ...getGithubCollaboratorActions(StateInterface),
    ...getGithubOrganizationActions(StateInterface),
    ...getGithubProductsActions(StateInterface),
    ...getGithubBillsActions(StateInterface),

    cleanStoreGithub({ commit }): void {
      commit(githubMutations.setAccounting, []);
      commit(githubMutations.setCollaborators, []);
      commit(githubMutations.setExpenses, []);
      commit(githubMutations.setIssues, []);
      commit(githubMutations.setTransactions, []);
    },

    async loadHomeData({ dispatch }, isAdmin: boolean) {
      if (isAdmin) {
        await dispatch(githubActions.loadIncomes, false);
        await dispatch(githubActions.loadExpenses, false);
      }
      await dispatch(githubActions.loadIssues, false);
      await dispatch(githubActions.loadAllAcounting, false);
    },
    getHomeContent({ commit, state }, isAdmin: boolean) {
      const result = isAdmin
        ? {
            ...IncomesService.getStats(state.incomes),
            ...ExpenseService.getStats(state.expenses),
            ...IssuesService.getStats(state.issues),
            ...AccountService.getStats(state.accounting)
          }
        : {
            ...IssuesService.getStats(state.issues),
            ...AccountService.getStats(state.accounting)
          };
      commit(githubMutations.setHomeProps, result);
    },
    async loadIndexContent({ commit }) {
      const result = await indexService.loadIndexContent();
      if (!!result) {
        commit(githubMutations.setIndexContent, result);
      }
      return result;
    },
    async setIndexContent({ dispatch }, data: FinanceIndexContentInputsGql) {
      const result = await indexService.setIndexContent(data);
      if (result) {
        await dispatch(githubActions.loadIndexContent);
      }
      return result;
    },
    async getModules({}, data: StorageAllInputGql) {
      const result = await storageService.getStorageByType(data);
      return result.map(
        item =>
          <StorageModuleItem>{
            id: item.id,
            type: item.type,
            image: item.image,
            content: JSON.parse(item.content) as StorageModuleItemContent
          }
      );
    },
    async getModulesByPagination({}, data: StoragePageInputGql) {
      const result = await storageService.getStorageByPagination(data);
      return <StorageModulePageModel>{
        storageItemsCount: result.storageItemsCount,
        storageItems: result.storageItems.map(
          item =>
            <StorageModuleItem>{
              id: item.id,
              type: item.type,
              image: item.image,
              content: JSON.parse(item.content) as StorageModuleItemContent
            }
        )
      };
    },
  };

  return actions;
};
