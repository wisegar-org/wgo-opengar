import { IMediaModel } from "../core";

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
  descending: boolean;
  sortBy: string;
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

export type IMediaResponseCheck = {
  id: number;
  mimetype?: string;
  isPublic?: boolean;
  data?: string;
  url?: string;
  delete?: boolean;
};

export interface IMediaInputArg {
  file: any;
  isPublic: boolean;
}

export interface IMediasInputArg {
  files: IMediaInputArg[];
}

export interface IMediaResponse {
  id?: number;
  mimetype?: string;
  isPublic?: boolean;
  data?: string;
  url?: string;
  error?: string;
  displayName?: string;
  fileName?: string;
}
