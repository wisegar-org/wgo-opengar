import {
  AccountDataResponse,
  AccountRecord,
  AccountResponse,
  TemplateHTML,
  TemplateStyle
} from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const AccountService = {
  async addAccount(params: AccountDataResponse): Promise<boolean> {
    try {
      const response: AccountResponse = await settings.axios.post(
        `${ApiSettings.API_URL}addAccounting`,
        params
      );
      return (
        response &&
        response.data &&
        response.data.created !== undefined &&
        response.data.created
      );
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async editAccounting(params: AccountRecord): Promise<boolean> {
    try {
      const response: AccountResponse = await settings.axios.post(
        `${ApiSettings.API_URL}editAccounting`,
        params
      );
      return (
        response &&
        response.data &&
        response.data.updated !== undefined &&
        response.data.updated
      );
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async getAllAcounting(): Promise<AccountRecord[]> {
    try {
      const response: AccountResponse = await settings.axios.get(
        `${ApiSettings.API_URL}accounts`
      );
      if (response && response.data && response.data.accounts) {
        return response.data.accounts;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async confirmAccount(idAccounting: number): Promise<boolean> {
    try {
      const params = {
        accountingId: idAccounting
      };
      const response: AccountResponse = await settings.axios.post(
        `${ApiSettings.API_URL}confirmAccount`,
        params
      );
      return (
        response &&
        response.data &&
        response.data.updated !== undefined &&
        response.data.updated
      );
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async exportToPdf(idAccounting: number): Promise<Blob | undefined> {
    try {
      const response: { data: Blob } = await settings.axios.get(
        `${ApiSettings.API_URL}exportPdf/${idAccounting}`,
        {
          method: 'GET',
          responseType: 'blob'
        }
      );
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      // console.log(error)
    }
  },
  async deleteAccount(idAccounting: number): Promise<void> {
    try {
      await settings.axios.get(
        `${ApiSettings.API_URL}removeAccounting/${idAccounting}`,
        {
          method: 'GET'
        }
      );
    } catch (error) {
      // console.log(error)
    }
  },
  async loadTemplate(entityTemplate: string): Promise<TemplateHTML> {
    try {
      const result = await settings.axios.get(
        `${ApiSettings.API_URL}loadAccountingTemplate`,
        {
          params: {
            entityTemplate
          }
        }
      );
      return result.data ? (result.data as TemplateHTML) : <TemplateHTML>{};
    } catch (error) {
      return <TemplateHTML>{};
      // console.log(error)
    }
  },
  async getDocumentPreview(config: unknown): Promise<string> {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}getAccountingDocumentPreview`,
        config
      );
      return result.data ? (result.data as string) : '';
    } catch (error) {
      return '';
    }
  },
  async saveTemplate(value: TemplateHTML): Promise<boolean> {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}saveAccountingTemplate`,
        { value }
      );
      return !!result.data;
    } catch (error) {
      return false;
      // console.log(error)
    }
  },
  async saveStyleTemplate(value: {
    template: TemplateStyle;
    documentToSet: number;
  }): Promise<boolean> {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}saveAccountingStyleTemplate`,
        { value: value.template, documentToSet: value.documentToSet }
      );
      return !!result.data;
    } catch (error) {
      return false;
      // console.log(error)
    }
  },
  getTotalToPay(accounting: AccountRecord): number {
    const total =
      accounting.total_hours * (accounting.pay_by_hours * 1000) +
      accounting.total_hours *
        accounting.pay_to_internet *
        accounting.internet_cost *
        1000;
    const taxes = accounting.taxes * 1000;
    return (total - taxes) / 1000;
  },
  getStats(accounts: AccountRecord[]) {
    const result = {
      accountsToConfirm: 0
    };

    accounts.forEach(account => {
      result.accountsToConfirm += account.status == 1 ? 1 : 0;
    });

    return result;
  },
  async sendLink(record: AccountRecord) {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}sendAccountingLink`,
        {
          id: record.id,
          urlApi: ApiSettings.API_URL
        }
      );
      const { data: dataRes } = result as {
        data: { message: string; error: string; isSuccess: boolean };
      };
      return !!dataRes && !!dataRes.isSuccess;
    } catch (error) {
      return false;
      // console.log(error)
    }
  },
  async getAccountingPreview(record: AccountRecord) {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}getAccountingPreview`,
        {
          id: record.id,
          urlApi: ApiSettings.API_URL
        }
      );
      const { data: dataRes } = result as {
        data: { url: string; error: string; isSuccess: boolean };
      };
      return dataRes;
    } catch (error) {
      return {
        isSuccess: false,
        url: '',
        error: error
      };
    }
  }
};
