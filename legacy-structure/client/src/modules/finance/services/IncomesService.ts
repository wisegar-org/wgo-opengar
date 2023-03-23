import { IncomeRecord, IncomeResponse } from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const IncomesService = {
  async loadIncomes(): Promise<IncomeRecord[]> {
    try {
      const response: IncomeResponse = await settings.axios.get(
        `${ApiSettings.API_URL}incomes`
      );
      const {
        data: { incomes }
      } = response;
      if (incomes) {
        return incomes;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadIncomeDetail(income: IncomeRecord): Promise<IncomeRecord | null> {
    try {
      const params = {
        id: income.id
      };
      const response: IncomeResponse = await settings.axios.get(
        `${ApiSettings.API_URL}incomeDetail`,
        {
          params: params
        }
      );
      const {
        data: { incomes }
      } = response;
      if (incomes && incomes.length) {
        return incomes[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async addIncome(params: IncomeRecord): Promise<IncomeRecord | null> {
    try {
      const response: IncomeResponse = await settings.axios.post(
        `${ApiSettings.API_URL}addIncome`,
        params
      );
      if (
        response &&
        response.data &&
        response.data.created &&
        response.data.incomes
      ) {
        return response.data.incomes[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async changeStatus(params: IncomeRecord): Promise<boolean> {
    try {
      const response: IncomeResponse = await settings.axios.post(
        `${ApiSettings.API_URL}changeIncomeStatus`,
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
  async updateIncome(params: IncomeRecord): Promise<boolean> {
    try {
      const response: IncomeResponse = await settings.axios.post(
        `${ApiSettings.API_URL}updateIncome`,
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
  getStats(incomes: IncomeRecord[]) {
    const result = {
      totalIncomeValue: 0,
      totalIncomeMouthValue: 0,
      totalIncomeMouthCount: 0
    };

    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0);

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(1);
    endDate.setHours(0, 0);

    incomes.forEach(income => {
      const incomeDate = new Date(income.date);
      result.totalIncomeValue += income.amount;
      result.totalIncomeMouthValue +=
        incomeDate > date && incomeDate < endDate ? income.amount : 0;
      result.totalIncomeMouthCount +=
        incomeDate > date && incomeDate < endDate ? 1 : 0;
    });

    result.totalIncomeMouthValue =
      Math.round(result.totalIncomeMouthValue * 10) / 10;
    result.totalIncomeValue = Math.round(result.totalIncomeValue * 10) / 10;

    return result;
  }
};
