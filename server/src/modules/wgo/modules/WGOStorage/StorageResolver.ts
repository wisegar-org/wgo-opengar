import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../../database';
import { MediaModel } from '../../models/MediaModel';
import { StorageAllInputGQL, StorageInputGQL, StoragePageInputGQL } from './StorageInputsGQL';
import { StorageItem, StorageModel } from './StorageModel';
import { StoragePageResponseGQL, StorageResponseGQL } from './StorageResponsesGQL';

@Resolver()
export class StorageResolver {
  storageModel: StorageModel;
  mediaModel: MediaModel;
  /**
   *
   */
  constructor() {
    const conn = GetConnection();
    this.storageModel = new StorageModel(conn);
    this.mediaModel = new MediaModel();
  }

  @Query(() => [StorageResponseGQL])
  async getStorageByType(@Arg('data') data: StorageAllInputGQL) {
    const result = await this.storageModel.allByType(data.type, ['image', 'imageList'], data.search);
    const listResult: StorageResponseGQL[] = await this.storageModel.getResponseList(
      result,
      data.lang,
      data.urlApi,
      data.loadTranslations
    );
    return listResult;
  }

  @Query(() => StoragePageResponseGQL)
  async getStorageByPagination(@Arg('data') data: StoragePageInputGQL) {
    const result = await this.storageModel.allByTypePage(
      data.type,
      ['image', 'imageList'],
      data.skip,
      data.take,
      data.search
    );

    const listResult: StorageResponseGQL[] = await this.storageModel.getResponseList(
      result.storageItems,
      data.lang,
      data.urlApi,
      data.loadTranslations
    );
    return <StoragePageResponseGQL>{
      storageItemsCount: result.storageItemsCount,
      storageItems: listResult,
    };
  }

  @Mutation(() => Boolean)
  async createStorageItem(@Arg('data') data: StorageInputGQL) {
    const result = await this.storageModel.create(<StorageItem>{
      content: JSON.parse(data.content as string),
      imageId: data.image,
      imageListId: data.imageList,
      type: data.type,
    });
    return result;
  }

  @Mutation(() => Boolean)
  async updateStorageItem(@Arg('data') data: StorageInputGQL) {
    const result = await this.storageModel.modify(<StorageItem>{
      id: data.id,
      content: JSON.parse(data.content as string),
      imageId: data.image,
      imageListId: data.imageList,
      type: data.type,
    });
    return result;
  }

  @Mutation(() => Boolean)
  async deleteStorageItem(@Arg('id') id: number) {
    const result = await this.storageModel.delete(id);
    return result;
  }
}
