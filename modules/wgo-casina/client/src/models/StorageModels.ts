import { IMediaModel } from 'src/wgo-base/core/models';

export interface StorageServiceItemContent {
  title: string;
  description: string;
  titleKey: string;
  descriptionKey: string;
}
export interface StorageServiceItem {
  id: number;
  type: string;
  content: StorageServiceItemContent;
}
export interface StorageServicePageModel {
  storageItemsCount: number;
  storageItems: StorageServiceItem[];
}

export interface StorageDoctorItemContent {
  name: string;
  description: string;
  nameKey: string;
  descriptionKey: string;
  email: string;
}
export interface StorageDoctorItem {
  id: number;
  type: string;
  content: StorageDoctorItemContent;
  image?: IMediaModel;
}
export interface StorageDoctorPageModel {
  storageItemsCount: number;
  storageItems: StorageDoctorItem[];
}
