import { ActionTree } from 'vuex';
import { IncomeRecord } from '../../models/models';
import { IncomesService } from '../../services/IncomesService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';
import { transactionsActions } from './transactionsActions';

export const incomesActions = {
  loadIncomes: 'loadIncomes',
  loadIncomeDetail: 'loadIncomeDetail',
  addIncome: 'addIncome',
  updateIncome: 'updateIncome',
  changeIncomeStatus: 'changeIncomeStatus'
};

export const getGithubIncomesActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadIncomes({ commit, state }, force = true): Promise<void> {
      if (force || state.incomes.length === 0) {
        const incomes = await IncomesService.loadIncomes();
        commit(githubMutations.setIncomes, incomes);
      }
    },

    async addIncome({ dispatch }, params: IncomeRecord): Promise<boolean> {
      const result = await IncomesService.addIncome(params);
      if (result) {
        void (await dispatch(incomesActions.loadIncomes));
      }
      return !!result;
    },
    async changeIncomeStatus(
      { dispatch },
      params: IncomeRecord
    ): Promise<boolean> {
      const result = await IncomesService.changeStatus(params);
      if (result) {
        void (await dispatch(incomesActions.loadIncomes));
        void (await dispatch(transactionsActions.loadTransactions));
      }
      return result;
    },
    async updateIncome({ dispatch }, params: IncomeRecord): Promise<boolean> {
      const result = await IncomesService.updateIncome(params);
      if (result) {
        void (await dispatch(incomesActions.loadIncomes));
      }
      return result;
    },
    async loadIncomeDetail(
      {},
      params: IncomeRecord
    ): Promise<IncomeRecord | null> {
      const result = await IncomesService.loadIncomeDetail(params);
      return result;
    }
  };

  return actions;
};
