import { ProductRecord, ProductResponse } from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const ProductService = {
  async loadProducts(): Promise<ProductRecord[]> {
    try {
      const response: ProductResponse = await settings.axios.get(
        `${ApiSettings.API_URL}products`
      );
      if (response && response.data && response.data.products) {
        return response.data.products;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadProductDetail(
    record: ProductRecord
  ): Promise<ProductRecord | undefined> {
    try {
      const response: ProductResponse = await settings.axios.get(
        `${ApiSettings.API_URL}productDetail`,
        {
          params: {
            id: record.id
          }
        }
      );
      if (response && response.data && response.data.products) {
        return response.data.products[0];
      } else return undefined;
    } catch (error) {
      // console.log(error)
      return undefined;
    }
  },
  async addProduct(params: ProductRecord): Promise<ProductRecord | null> {
    try {
      const response: ProductResponse = await settings.axios.post(
        `${ApiSettings.API_URL}addProduct`,
        params
      );
      if (
        response &&
        response.data &&
        response.data.created &&
        response.data.products
      ) {
        return response.data.products[0];
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async updateProduct(params: ProductRecord): Promise<boolean> {
    try {
      const response: ProductResponse = await settings.axios.post(
        `${ApiSettings.API_URL}updateProduct`,
        params
      );
      return response && response.data && !!response.data.updated;
    } catch (error) {
      // console.log(error)
      return false;
    }
  }
};
