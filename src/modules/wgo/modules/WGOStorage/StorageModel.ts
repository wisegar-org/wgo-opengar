import { TranslationService } from '@wisegar-org/wgo-opengar-core';
import { isString } from 'lodash';
import { Connection, Repository } from 'typeorm';
import { MediaResponseGQL } from '..';
import StorageEntity from '../../database/entities/StorageEntity';
import { MediaModel } from '../../models/MediaModel';
import { StorageResponseGQL } from './StorageResponsesGQL';

export interface StorageItem {
  id: number;
  type: string;
  content: any;
  imageId: number;
  imageListId: number[];
}

export const StorageKeys = 'WGO_STORAGE_CONTENT';

export class StorageModel {
  storageRepository: Repository<StorageEntity>;
  private mediaModel: MediaModel;
  private translationService: TranslationService;

  /**
   *
   */
  constructor(conn: Connection) {
    this.storageRepository = conn.getRepository(StorageEntity);
    this.mediaModel = new MediaModel();
    this.translationService = new TranslationService(conn);
  }

  async allByType(type: string, relations: string[] = [], search: string = '') {
    return this.allByCriteria({ type: type }, relations, search);
  }

  async allByTypePage(type: string, relations: string[] = [], skip: number = 0, take: number = 0, search: string = '') {
    const result = await this.allByCriteria({ type: type }, relations, search);
    return {
      storageItemsCount: result.length,
      storageItems: result.slice(skip, skip + take),
    };
  }

  async allByCriteria(condition: any, relations: string[] = [], search: string = '') {
    const fields = await this.storageRepository.find({
      where: condition,
      relations: relations,
    });

    const result = fields.filter((item) => !search || JSON.stringify(item.content).indexOf(search) !== -1);

    return result;
  }

  async oneByCriteria(condition: any, relations: string[] = []) {
    const field = await this.storageRepository.findOne({
      where: condition,
      relations: relations,
    });

    return field;
  }

  async create(storageItem: StorageItem) {
    let model = new StorageEntity();
    model = await this.storageRepository.manager.save(model);
    model = await this.setProperties(model, storageItem);
    return !!(await this.storageRepository.manager.save(model));
  }

  async modify(storageItem: StorageItem) {
    let model = await this.oneByCriteria({ id: storageItem.id });
    if (!!model) {
      model = await this.setProperties(model, storageItem);
      await this.storageRepository.manager.save(model);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const model = await this.oneByCriteria({ id: id });
    if (!!model) {
      await this.storageRepository.manager.remove(model);
      return true;
    }
    return false;
  }

  async setProperties(model: StorageEntity, storageItem: StorageItem) {
    model.type = storageItem.type;
    const modelContent = isString(model.content) ? JSON.parse(model.content as string) : model.content;

    if (!!storageItem.content) {
      const content = storageItem.content;
      for (const prop of Object.keys(content)) {
        if (content[prop] instanceof Array) {
          const key = this.getKeyToProperty(model.id, prop);
          for (const trans of content[prop]) {
            const translation = trans as { languageId: number; value: string };
            await this.translationService.setTranslation(translation.languageId, key, translation.value);
          }
          modelContent[prop] = key;
        } else {
          modelContent[prop] = content[prop];
        }
      }
      model.content = modelContent;
    }

    const media = storageItem.imageId ? await this.mediaModel.getMediaList([storageItem.imageId]) : null;
    if (media && media.length > 0) {
      model.image = media[0];
    }

    const mediaList = storageItem.imageListId ? await this.mediaModel.getMediaList(storageItem.imageListId) : null;
    if (mediaList) {
      model.imageList = mediaList;
    }
    return model;
  }

  getKeyToProperty(idModel: number, property: string) {
    return `${StorageKeys}_${property}_${idModel}`.toUpperCase();
  }

  async getResponseList(models: StorageEntity[], lang: number, urlApi = '', loadTranslation = true) {
    const results: StorageResponseGQL[] = [];
    for (const model of models) {
      const item = this.getStorageResponses(model, urlApi);
      const content = item.content;
      for (const key of Object.keys(content)) {
        if (content[key].indexOf(StorageKeys) !== -1) {
          content[key + 'Key'] = content[key];
          content[key] = await this.translationService.getTranslation(lang, content[key], !loadTranslation);
        }
      }
      item.content = JSON.stringify(content);
      results.push(item);
    }
    return results;
  }

  getStorageResponses(model: StorageEntity, urlApi = '') {
    let image = undefined;
    const imageList: MediaResponseGQL[] = [];

    if (!!model.image) {
      image = MediaModel.getMediaResponse(model.image, urlApi);
    }

    if (!!model.imageList) {
      model.imageList.forEach((img) => {
        imageList.push(MediaModel.getMediaResponse(img, urlApi));
      });
    }

    return <StorageResponseGQL>{
      content: model.content,
      id: model.id,
      type: model.type,
      image: image,
      imageList: imageList,
    };
  }
}
