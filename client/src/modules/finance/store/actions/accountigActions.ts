import { ActionTree } from 'vuex';
import {
  AccountDataResponse,
  AccountRecord,
  TemplateHTML,
  TemplateStyle
} from '../../models/models';
import { AccountService } from '../../services/AccountService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';
import { expensesActions } from './expensesActions';
import { issuesActions } from './issuesActions';
import { transactionsActions } from './transactionsActions';

export const accountingActions = {
  addAccounting: 'addAccounting',
  updateAccountingData: 'updateAccountingData',
  confirmAccounting: 'confirmAccounting',
  deleteAccount: 'deleteAccount',
  loadAllAcounting: 'loadAllAcounting',
  exportToPdf: 'exportToPdf',
  loadAccountingTemplate: 'loadAccountingTemplate',
  saveAccountingTemplate: 'saveAccountingTemplate',
  sendAccountingLink: 'sendAccountingLink',
  getAccountingDocumentPreview: 'getAccountingDocumentPreview',
  saveAccountingStyleTemplate: 'saveAccountingStyleTemplate',
  getAccountingPreview: 'getAccountingPreview'
};

export const getGithubAccountingActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadAllAcounting({ commit, state }, force = true): Promise<void> {
      if (force || state.accounting.length === 0) {
        const accountings = await AccountService.getAllAcounting();
        commit(githubMutations.setAccounting, accountings);
      }
    },
    async addAccounting(
      { dispatch },
      params: AccountDataResponse
    ): Promise<boolean> {
      const result = await AccountService.addAccount(params);
      if (result) {
        void (await dispatch(accountingActions.loadAllAcounting));
        void (await dispatch(issuesActions.loadIssues, true));
      }
      return result;
    },
    async deleteAccount({ dispatch }, idAccounting: number) {
      void (await AccountService.deleteAccount(idAccounting));
      void (await dispatch(accountingActions.loadAllAcounting));
      void (await dispatch(issuesActions.loadIssues, true));
    },
    async updateAccountingData(
      { dispatch },
      record: AccountRecord
    ): Promise<boolean> {
      const response = await AccountService.editAccounting(record);
      if (response) {
        void (await dispatch(accountingActions.loadAllAcounting));
      }
      return response;
    },
    async confirmAccounting(
      { dispatch },
      idAccounting: number
    ): Promise<boolean> {
      const response: boolean = await AccountService.confirmAccount(
        idAccounting
      );
      if (response) {
        void (await dispatch(accountingActions.loadAllAcounting));
        void (await dispatch(transactionsActions.loadTransactions));
        void (await dispatch(expensesActions.loadExpenses));
        void (await dispatch(issuesActions.loadIssues, true));
      }
      return response;
    },
    async exportToPdf({}, idAccounting: number) {
      const result: Blob | undefined = await AccountService.exportToPdf(
        idAccounting
      );
      return result;
    },
    async loadAccountingTemplate({}, entityTemplate: string) {
      const result = await AccountService.loadTemplate(entityTemplate);
      return result;
    },
    async getAccountingDocumentPreview({}, config: unknown) {
      const result = await AccountService.getDocumentPreview(config);
      return result;
    },
    async saveAccountingTemplate({}, value: TemplateHTML) {
      const result = await AccountService.saveTemplate(value);
      return result;
    },
    async saveAccountingStyleTemplate(
      {},
      value: { template: TemplateStyle; documentToSet: number }
    ) {
      const result = await AccountService.saveStyleTemplate(value);
      return result;
    },
    async sendAccountingLink({}, record: AccountRecord) {
      const result = await AccountService.sendLink(record);
      return result;
    },
    async getAccountingPreview({}, record: AccountRecord) {
      const result = await AccountService.getAccountingPreview(record);
      return result.isSuccess ? result.url : '';
    }
  };

  return actions;
};
