import { ServiceProvider } from '@wisegar-org/wgo-opengar-core-ui';
import {
  CasinaIndexContentInputsGql,
  StorageAllInputGql,
  StorageInputGql,
  StoragePageInputGql
} from 'src/graphql';
import {
  StorageDoctorItem,
  StorageDoctorItemContent,
  StorageDoctorPageModel,
  StorageServiceItem,
  StorageServiceItemContent,
  StorageServicePageModel
} from '../../models/StorageModels';
import { StorageService } from 'src/modules/wgo/services/StorageService';
import { ActionTree } from 'vuex';
import { casinaModelsMutationsKeys } from '.';
import { CasinaModelsService } from '../../services/CasinaModelsService';
import { CasinaModelsStateInterface } from './state';

const casinaService: CasinaModelsService = ServiceProvider.GetScoped(
  CasinaModelsService
);
const storageService: StorageService = ServiceProvider.GetScoped(
  StorageService
);

export const casinaModelsActionsKeys = {
  loadCasinaIndexContent: 'loadCasinaIndexContent',
  setCasinaIndexContent: 'setCasinaIndexContent',
  getServicesByPagination: 'getServicesByPagination',
  getServicesByType: 'getServicesByType',
  getDoctorsByPagination: 'getDoctorsByPagination',
  getDoctorsByType: 'getDoctorsByType',
  createStorageItem: 'createStorageItem',
  modifyStorageItem: 'modifyStorageItem',
  deleteStorageItem: 'deleteStorageItem'
  //RICK pon las tuyas debajo de este comentario
};

const actions: ActionTree<CasinaModelsStateInterface, any> = {
  async loadCasinaIndexContent({ commit }) {
    const result = await casinaService.loadCasinaIndexContent();
    if (!!result) {
      commit(casinaModelsMutationsKeys.setIndexContent, result);
    }
    return result;
  },
  async setCasinaIndexContent({ dispatch }, data: CasinaIndexContentInputsGql) {
    const result = await casinaService.setCasinaIndexContent(data);
    if (result) {
      await dispatch(casinaModelsActionsKeys.loadCasinaIndexContent);
    }
    return result;
  },
  async getServicesByPagination({}, data: StoragePageInputGql) {
    const result = await storageService.getStorageByPagination(data);
    return <StorageServicePageModel>{
      storageItemsCount: result.storageItemsCount,
      storageItems: result.storageItems.map(
        item =>
          <StorageServiceItem>{
            id: item.id,
            type: item.type,
            content: JSON.parse(item.content) as StorageServiceItemContent
          }
      )
    };
  },
  async getServicesByType({}, data: StorageAllInputGql) {
    const result = await storageService.getStorageByType(data);
    return result.map(
      item =>
        <StorageServiceItem>{
          id: item.id,
          type: item.type,
          content: JSON.parse(item.content) as StorageServiceItemContent
        }
    );
  },
  async getDoctorsByPagination({}, data: StoragePageInputGql) {
    const result = await storageService.getStorageByPagination(data);
    return <StorageDoctorPageModel>{
      storageItemsCount: result.storageItemsCount,
      storageItems: result.storageItems.map(
        item =>
          <StorageDoctorItem>{
            id: item.id,
            type: item.type,
            image: item.image,
            content: JSON.parse(item.content) as StorageDoctorItemContent
          }
      )
    };
  },
  async getDoctorsByType({}, data: StorageAllInputGql) {
    const result = await storageService.getStorageByType(data);
    return result.map(
      item =>
        <StorageDoctorItem>{
          id: item.id,
          type: item.type,
          image: item.image,
          content: JSON.parse(item.content) as StorageDoctorItemContent
        }
    );
  },
  async createStorageItem({}, data: StorageInputGql) {
    const result = await storageService.createStorageItem(data);
    return result;
  },
  async modifyStorageItem({}, data: StorageInputGql) {
    const result = await storageService.modifyStorageItem(data);
    return result;
  },
  async deleteStorageItem({}, id: number) {
    const result = await storageService.deleteStorageItem(id);
    return result;
  }
  //RICK pon las tuyas debajo de este comentario
};

export default actions;
