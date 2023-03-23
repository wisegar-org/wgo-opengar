import { ActionTree } from 'vuex';
import { BillRecord, TemplateHTML, TemplateStyle } from '../../models/models';
import { BillService } from '../../services/BillService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';
import { productsActions } from './productActions';
import { transactionsActions } from './transactionsActions';

export const billsActions = {
  loadBills: 'loadBills',
  loadBillDetail: 'loadBillDetail',
  addBill: 'addBill',
  updateBill: 'updateBill',
  changeStatusToPayed: 'changeStatusToPayed',
  changeStatusToCancelled: 'changeStatusToCancelled',
  loadBillTemplate: 'loadBillTemplate',
  saveBillTemplate: 'saveBillTemplate',
  saveBillStyleTemplate: 'saveBillStyleTemplate',
  getBillDocumentPreview: 'getBillDocumentPreview',
  sendBillLink: 'sendBillLink',
  getBillPreview: 'getBillPreview'
};

export const getGithubBillsActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadBills({ state, commit }, force): Promise<void> {
      if (force || state.bills.length === 0) {
        const bills = await BillService.loadBills();
        commit(githubMutations.setBills, bills);
      }
    },
    async loadBillDetail({}, record: BillRecord) {
      const bill = await BillService.loadBillDetail(record);
      return bill;
    },
    async addBill({ dispatch }, record: BillRecord) {
      const result = await BillService.addBill(record);
      if (result) {
        await dispatch(billsActions.loadBills, true);
        await dispatch(productsActions.loadProducts, true);
      }
      return !!result;
    },
    async updateBill({ dispatch }, record: BillRecord) {
      const result = await BillService.updateBill(record);
      if (result) {
        await dispatch(billsActions.loadBills, true);
        await dispatch(productsActions.loadProducts, true);
      }
      return !!result;
    },
    async changeStatusToPayed({ dispatch }, record: BillRecord) {
      const result = await BillService.changeStatusToPayed(record);
      if (record) {
        await dispatch(billsActions.loadBills, true);
        await dispatch(transactionsActions.loadTransactions, true);
      }
      return !!result;
    },
    async changeStatusToCancelled({ dispatch }, record: BillRecord) {
      const result = await BillService.changeStatusToCancelled(record);
      if (record) {
        await dispatch(billsActions.loadBills, true);
        await dispatch(productsActions.loadProducts, true);
      }
      return !!result;
    },
    async loadBillTemplate(
      {},
      value: { entityTemplate: string; langId: number }
    ) {
      const result = await BillService.loadTemplate(value);
      return result;
    },
    async getBillDocumentPreview({}, config: unknown) {
      const result = await BillService.getDocumentPreview(config);
      return result;
    },
    async saveBillTemplate({}, value: { value: TemplateHTML; langId: number }) {
      const result = await BillService.saveTemplate(value);
      return result;
    },
    async saveBillStyleTemplate(
      {},
      value: { template: TemplateStyle; documentToSet: number }
    ) {
      const result = await BillService.saveStyleTemplate(value);
      return result;
    },
    async sendBillLink({ dispatch }, record: BillRecord) {
      const result = await BillService.sendBillLink(record);
      if (record.status === 1) {
        await dispatch(billsActions.loadBills, true);
      }
      return result;
    },
    async getBillPreview({}, record: BillRecord) {
      const result = await BillService.getBillPreview(record);
      return result.isSuccess ? result.url : '';
    }
  };

  return actions;
};
