import { ActionTree } from 'vuex';
import { TransactionRecord } from '../../models/models';
import { TransactionService } from '../../services/TransactionService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';

export const transactionsActions = {
  loadTransactions: 'loadTransactions',
  addTransaction: 'addTransaction',
  setTransactionId: 'setTransactionId'
};

export const getGithubTransactionsActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadTransactions({ commit, state }, force = true): Promise<void> {
      if (force || state.transactions.length === 0) {
        const transactions = await TransactionService.loadTransactions();
        commit(githubMutations.setTransactions, transactions);
      }
    },
    async addTransaction(
      { dispatch },
      params: TransactionRecord
    ): Promise<boolean> {
      const result = await TransactionService.addTransaction(params);
      if (result) {
        void (await dispatch(transactionsActions.loadTransactions));
      }
      return !!result;
    },
    async setTransactionId({ dispatch }, params: TransactionRecord) {
      const result = await TransactionService.setTransactionId(params);
      if (result) {
        void (await dispatch(transactionsActions.loadTransactions));
      }
      return result;
    }
  };

  return actions;
};
