import { ActionTree } from 'vuex';
import { ExpenseRecord } from '../../models/models';
import { ExpenseService } from '../../services/ExpensesService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';
import { transactionsActions } from './transactionsActions';

export const expensesActions = {
  loadExpenses: 'loadExpenses',
  loadExpenseDetail: 'loadExpenseDetail',
  addExpense: 'addExpense',
  changeExpenseStatus: 'changeExpenseStatus',
  updateExpense: 'updateExpense'
};

export const getGithubExpensesActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadExpenses({ commit, state }, force = true): Promise<void> {
      if (force || state.expenses.length === 0) {
        const expenses = await ExpenseService.loadExpenses();
        commit(githubMutations.setExpenses, expenses);
      }
    },
    async loadExpenseDetail(
      {},
      params: ExpenseRecord
    ): Promise<ExpenseRecord | null> {
      const expense = await ExpenseService.loadExpenseDetail(params);
      return expense;
    },
    async addExpense({ dispatch }, params: ExpenseRecord): Promise<boolean> {
      const result = await ExpenseService.addExpense(params);
      if (result) {
        void (await dispatch(expensesActions.loadExpenses));
      }
      return !!result;
    },
    async changeExpenseStatus(
      { dispatch },
      params: ExpenseRecord
    ): Promise<boolean> {
      const result = await ExpenseService.changeStatus(params);
      if (result) {
        void (await dispatch(expensesActions.loadExpenses));
        void (await dispatch(transactionsActions.loadTransactions));
      }
      return result;
    },
    async updateExpense({ dispatch }, params: ExpenseRecord): Promise<boolean> {
      const result = await ExpenseService.updateExpense(params);
      if (result) {
        void (await dispatch(expensesActions.loadExpenses));
      }
      return result;
    }
  };

  return actions;
};
