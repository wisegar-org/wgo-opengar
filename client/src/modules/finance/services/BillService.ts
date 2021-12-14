import {
  BillRecord,
  BillResponse,
  TemplateHTML,
  TemplateStyle
} from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const BillService = {
  async loadBills(): Promise<BillRecord[]> {
    try {
      const response: BillResponse = await settings.axios.get(
        `${ApiSettings.API_URL}bills`
      );
      if (response && response.data && response.data.bills) {
        return response.data.bills;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadBillDetail(record: BillRecord): Promise<BillRecord | undefined> {
    try {
      const response: BillResponse = await settings.axios.get(
        `${ApiSettings.API_URL}billDetail`,
        {
          params: {
            id: record.id
          }
        }
      );
      if (response && response.data && response.data.bills) {
        return response.data.bills[0];
      } else return undefined;
    } catch (error) {
      // console.log(error)
      return undefined;
    }
  },
  async addBill(params: BillRecord): Promise<BillRecord | null> {
    try {
      const response: BillResponse = await settings.axios.post(
        `${ApiSettings.API_URL}addBill`,
        params
      );
      if (
        response &&
        response.data &&
        response.data.created &&
        response.data.bills
      ) {
        return response.data.bills[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async updateBill(params: BillRecord): Promise<boolean> {
    try {
      const response: BillResponse = await settings.axios.post(
        `${ApiSettings.API_URL}updateBill`,
        params
      );
      return response && response.data && !!response.data.updated;
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async changeStatusToPayed(params: BillRecord): Promise<boolean> {
    try {
      const response: BillResponse = await settings.axios.post(
        `${ApiSettings.API_URL}payBill`,
        params
      );
      return response && response.data && !!response.data.updated;
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async changeStatusToCancelled(params: BillRecord): Promise<boolean> {
    try {
      const response: BillResponse = await settings.axios.post(
        `${ApiSettings.API_URL}cancelBill`,
        params
      );
      return response && response.data && !!response.data.updated;
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async loadTemplate(value: {
    entityTemplate: string;
    langId: number;
  }): Promise<TemplateHTML> {
    try {
      const result = await settings.axios.get(
        `${ApiSettings.API_URL}loadBillTemplate`,
        {
          params: value
        }
      );
      return result.data ? (result.data as TemplateHTML) : <TemplateHTML>{};
    } catch (error) {
      return <TemplateHTML>{};
    }
  },
  async getDocumentPreview(config: unknown): Promise<string> {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}getBillDocumentPreview`,
        config
      );
      return result.data ? (result.data as string) : '';
    } catch (error) {
      return '';
    }
  },
  async saveTemplate(value: {
    value: TemplateHTML;
    langId: number;
  }): Promise<boolean> {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}saveBillTemplate`,
        value
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
        `${ApiSettings.API_URL}saveBillStyleTemplate`,
        { value: value.template, documentToSet: value.documentToSet }
      );
      return !!result.data;
    } catch (error) {
      return false;
      // console.log(error)
    }
  },
  async sendBillLink(record: BillRecord): Promise<boolean> {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}sendBillLink`,
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
  async getBillPreview(record: BillRecord) {
    try {
      const result = await settings.axios.post(
        `${ApiSettings.API_URL}getBillPreview`,
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
        error: error,
        url: ''
      };
    }
  }
};
