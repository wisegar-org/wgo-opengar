import { ExpenseRecord, ExpenseResponse } from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const ExpenseService = {
  async loadExpenses(): Promise<ExpenseRecord[]> {
    try {
      const response: ExpenseResponse = await settings.axios.get(
        `${ApiSettings.API_URL}expenses`
      );
      if (response && response.data && response.data.expenses) {
        return response.data.expenses;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadExpenseDetail(
    expense: ExpenseRecord
  ): Promise<ExpenseRecord | null> {
    try {
      const params = {
        id: expense.id
      };
      const response: ExpenseResponse = await settings.axios.get(
        `${ApiSettings.API_URL}expenseDetail`,
        {
          params: params
        }
      );
      const {
        data: { expenses }
      } = response;
      if (expenses && expenses.length) {
        return expenses[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async addExpense(params: ExpenseRecord): Promise<ExpenseRecord | null> {
    try {
      const response: ExpenseResponse = await settings.axios.post(
        `${ApiSettings.API_URL}addExpense`,
        params
      );
      if (
        response &&
        response.data &&
        response.data.created &&
        response.data.expenses
      ) {
        return response.data.expenses[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async changeStatus(params: ExpenseRecord): Promise<boolean> {
    try {
      const response: ExpenseResponse = await settings.axios.post(
        `${ApiSettings.API_URL}changeExpenseStatus`,
        params as { id: number; status: number }
      );
      return (
        response &&
        response.data &&
        !!response.data.updated &&
        response.data.updated
      );
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async updateExpense(params: ExpenseRecord): Promise<boolean> {
    try {
      const response: ExpenseResponse = await settings.axios.post(
        `${ApiSettings.API_URL}updateExpense`,
        params
      );
      return (
        response &&
        response.data &&
        !!response.data.updated &&
        response.data.updated
      );
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  getStats(expenses: ExpenseRecord[]) {
    const result = {
      totalExpenseValue: 0,
      totalExpenseMouthValue: 0,
      totalExpenseMouthCount: 0
    };

    const date = new Date(Date.now());
    date.setDate(1);
    date.setHours(0, 0);

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(1);
    endDate.setHours(0, 0);

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      result.totalExpenseValue += expense.cost;
      result.totalExpenseMouthValue +=
        expenseDate > date && expenseDate < endDate ? expense.cost : 0;
      result.totalExpenseMouthCount +=
        expenseDate > date && expenseDate < endDate ? 1 : 0;
    });

    result.totalExpenseMouthValue =
      Math.round(result.totalExpenseMouthValue * 10) / 10;
    result.totalExpenseValue = Math.round(result.totalExpenseValue * 10) / 10;

    return result;
  }
};
