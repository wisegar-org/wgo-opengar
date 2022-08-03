import { IMediaModel } from "../../core/models";

export interface IStorageAllInput {
  lang: number;
  loadTranslations?: boolean;
  type: string;
  urlApi: string;
  search?: string;
}

export interface IStorageInput {
  id: number;
  type: string;
  content: string;
  image?: number;
  imageList?: number[];
}

export interface IStoragePageInput {
  lang: number;
  loadTranslations?: boolean;
  skip?: number;
  take?: number;
  type: string;
  urlApi: string;
  search?: string;
}

export type IStorageResponse = {
  id: number;
  type: string;
  content: string;
  image?: IMediaModel;
  imageList?: IMediaModel[];
};

export interface IStoragePageModel {
  storageItemsCount: number;
  storageItems: {
    id: number;
    type: string;
    content: string;
    image: IMediaModel;
    imageList: IMediaModel[];
  }[];
}
