import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { IContextBase } from "../../../core/models/context";
import { StorageItem, StorageModel } from "../../models/StorageModel";
import {
  STORAGE_PATH_DELETE_STORAGE,
  STORAGE_PATH_GET_STORAGE_BY_PAGE,
  STORAGE_PATH_GET_STORAGE_BY_TYPE,
  STORAGE_PATH_POST_STORAGE,
  STORAGE_PATH_PUT_STORAGE,
} from "../../router/server";
import {
  StorageAllInput,
  StorageInput,
  StoragePageInput,
} from "./StorageInputs";
import { StoragePageResponse, StorageResponse } from "./StorageResponses";

@Resolver()
export class StorageResolver {
  @Query(() => [StorageResponse], { name: STORAGE_PATH_GET_STORAGE_BY_TYPE })
  async getStorageByType(
    @Arg("data") data: StorageAllInput,
    @Ctx() ctx: IContextBase
  ) {
    const storageModel = new StorageModel(ctx);
    const result = await storageModel.allByType(
      data.type,
      ["image", "imageList"],
      data.search
    );
    const listResult: StorageResponse[] = await storageModel.getResponseList(
      result,
      data.lang,
      data.urlApi,
      data.loadTranslations
    );
    return listResult;
  }

  @Query(() => StoragePageResponse, {
    name: STORAGE_PATH_GET_STORAGE_BY_PAGE,
  })
  async getStorageByPagination(
    @Arg("data") data: StoragePageInput,
    @Ctx() ctx: IContextBase
  ) {
    const storageModel = new StorageModel(ctx);
    const result = await storageModel.allByTypePage(
      data.type,
      ["image", "imageList"],
      data.skip,
      data.take,
      data.search
    );

    const listResult: StorageResponse[] = await storageModel.getResponseList(
      result.storageItems,
      data.lang,
      data.urlApi,
      data.loadTranslations
    );
    return <StoragePageResponse>{
      storageItemsCount: result.storageItemsCount,
      storageItems: listResult,
    };
  }

  @Authorized()
  @Mutation(() => Boolean, { name: STORAGE_PATH_POST_STORAGE })
  async createStorageItem(
    @Arg("data") data: StorageInput,
    @Ctx() ctx: IContextBase
  ) {
    const storageModel = new StorageModel(ctx);
    const result = await storageModel.create(<StorageItem>{
      content: JSON.parse(data.content as string),
      imageId: data.image,
      imageListId: data.imageList,
      type: data.type,
    });
    return result;
  }

  @Authorized()
  @Mutation(() => Boolean, { name: STORAGE_PATH_PUT_STORAGE })
  async updateStorageItem(
    @Arg("data") data: StorageInput,
    @Ctx() ctx: IContextBase
  ) {
    const storageModel = new StorageModel(ctx);
    const result = await storageModel.modify(<StorageItem>{
      id: data.id,
      content: JSON.parse(data.content as string),
      imageId: data.image,
      imageListId: data.imageList,
      type: data.type,
    });
    return result;
  }

  @Authorized()
  @Mutation(() => Boolean, { name: STORAGE_PATH_DELETE_STORAGE })
  async deleteStorageItem(@Arg("id") id: number, @Ctx() ctx: IContextBase) {
    const storageModel = new StorageModel(ctx);
    const result = await storageModel.delete(id);
    return result;
  }
}
