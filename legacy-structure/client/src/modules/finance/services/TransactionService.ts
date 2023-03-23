import { TransactionRecord, TransactionResponse } from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const TransactionService = {
  async loadTransactions(): Promise<TransactionRecord[]> {
    try {
      const response: TransactionResponse = await settings.axios.get(
        `${ApiSettings.API_URL}transactions`
      );
      if (response && response.data && response.data.transactions) {
        return response.data.transactions;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async addTransaction(
    params: TransactionRecord
  ): Promise<TransactionRecord | null> {
    try {
      const response: TransactionResponse = await settings.axios.post(
        `${ApiSettings.API_URL}addTransaction`,
        params
      );
      if (
        response &&
        response.data &&
        response.data.created &&
        response.data.transactions
      ) {
        return response.data.transactions[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async setTransactionId(
    params: TransactionRecord
  ): Promise<TransactionRecord | null> {
    try {
      const response: TransactionResponse = await settings.axios.post(
        `${ApiSettings.API_URL}setIdTransaction`,
        params
      );
      if (
        response &&
        response.data &&
        response.data.update &&
        response.data.transactions
      ) {
        return response.data.transactions[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  }
};
