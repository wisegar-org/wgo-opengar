import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import {
  StorageAllInputGql,
  StorageInputGql,
  StoragePageInputGql,
  StorageResponseGql
} from 'src/graphql';
import {
  Q_STORAGE_ITEMSBYPAGE,
  M_STORAGE_CREATEITEM,
  M_STORAGE_MODIFYITEM,
  M_STORAGE_DELETEITEM,
  Q_STORAGE_ALLITEMS
} from '../graphql/storage';
import { StoragePageModel } from '../models';

export class StorageService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getStorageByPagination(
    data: StoragePageInputGql
  ): Promise<StoragePageModel> {
    try {
      const response = (await this.apiService.query({
        query: Q_STORAGE_ITEMSBYPAGE,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { getStorageByPagination: StoragePageModel } };

      if (response.data && response.data.getStorageByPagination) {
        const {
          data: { getStorageByPagination }
        } = response;
        return getStorageByPagination;
      }
      return { storageItemsCount: 0, storageItems: [] };
    } catch (error) {
      throw `StorageService getStorageByPagination: ${error as string}`;
    }
  }

  public async getStorageByType(
    data: StorageAllInputGql
  ): Promise<StorageResponseGql[]> {
    try {
      const response = (await this.apiService.query({
        query: Q_STORAGE_ALLITEMS,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { getStorageByType: StorageResponseGql[] } };

      if (response.data && response.data.getStorageByType) {
        const {
          data: { getStorageByType }
        } = response;
        return getStorageByType;
      }
      return [];
    } catch (error) {
      throw `StorageService getStorageByType: ${error as string}`;
    }
  }

  public async createStorageItem(data: StorageInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_STORAGE_CREATEITEM,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { createStorageItem: boolean } };

      if (response.data && response.data.createStorageItem) {
        const {
          data: { createStorageItem }
        } = response;
        return createStorageItem;
      }
      return false;
    } catch (error) {
      throw `StorageService createStorageItem: ${error as string}`;
    }
  }

  public async modifyStorageItem(data: StorageInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_STORAGE_MODIFYITEM,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { updateStorageItem: boolean } };

      if (response.data && response.data.updateStorageItem) {
        const {
          data: { updateStorageItem }
        } = response;
        return updateStorageItem;
      }
      return false;
    } catch (error) {
      throw `StorageService modifyStorageItem: ${error as string}`;
    }
  }

  public async deleteStorageItem(id: number): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_STORAGE_DELETEITEM,
        variables: {
          id: id
        },
        fetchPolicy: 'no-cache'
      })) as { data: { deleteStorageItem: boolean } };

      if (response.data && response.data.deleteStorageItem) {
        const {
          data: { deleteStorageItem }
        } = response;
        return deleteStorageItem;
      }
      return false;
    } catch (error) {
      throw `StorageService deleteStorageItem: ${error as string}`;
    }
  }
}
