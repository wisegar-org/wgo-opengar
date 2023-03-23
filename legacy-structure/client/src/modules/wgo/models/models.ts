import { iteratee } from 'lodash';
import { MediaResponseGql } from 'src/graphql';
import { IColumn } from './IColumn';

export interface UserRol {
  id: number;
  name: string;
}
export interface UserLogged {
  id: number;
  uuid: string;
  email: string;
  name: string;
  lastName: string;
  userName: string;
  isEmailConfirmed: boolean;
  roles: UserRol[];
  isAdmin: boolean;
  isUser: boolean;
  languageId: number;
}

export type FunctionDictionary = {
  [key: string]: () => void;
};

export interface ColumnUserTable extends IColumn {
  field?: (row: UsersModel) => string | string;
}

export interface UsersResponseModel {
  isSuccess: boolean;
  result: UsersModel[];
  message: string;
  error: string;
}

export interface RolesResponseModel {
  isSuccess: boolean;
  result: RolModel[];
  message: string;
  error: string;
}

export interface UsersModel {
  id: number;

  uuid: string;

  email: string;

  name: string;

  lastName: string;

  userName: string;

  isEmailConfirmed: boolean;

  roles: RolModel[];

  password: string;
}

export interface UsersSendModel {
  id: number;

  uuid: string;

  email: string;

  name: string;

  lastName: string;

  userName: string;

  isEmailConfirmed: boolean;

  roles: number[];

  password: string;
}

export interface RolModel {
  id: number;
  name: string;
}

export interface UserFilterArgs {
  id?: number;
  uuid?: string;
  email?: string;
  name?: string;
  lastName?: string;
}

export interface ITranslations {
  WGO_CLOSE_BTN: string;
  WGO_SAVE_BTN: string;
  WGO_CLEAN_BTN: string;
  WGO_APPLY_BTN: string;
  WGO_EDIT_BTN: string;
  WGO_ADD_BTN: string;
  WGO_YES_BTN: string;
  WGO_NO_BTN: string;
  WGO_CONTINUE_BTN: string;
  WGO_BACK_BTN: string;
  WGO_FINISH_BTN: string;
  WGO_CONFIRM_BTN: string;
  WGO_PREVIEW_BTN: string;
  WGO_DELETE_BTN: string;
  WGO_SEND_BTN: string;
  WGO_RESEND_BTN: string;
  WGO_RECORD_PER_PAGE_LABEL: string;
  WGO_ADMIN_TITLE: string;
  WGO_LOGIN_LABEL: string;
  WGO_LOGOUT_LABEL: string;
  WGO_CONTAIN_LABEL: string;
  WGO_EQUAL_LABEL: string;
  WGO_AND_LABEL: string;
  WGO_OR_LABEL: string;
  WGO_ERROR_NULL_FIELD: string;
}

export interface BoolDictionary {
  [key: string]: boolean;
}

export interface MetaData {
  name: string;
  property: string;
  content: string;
}

export interface StoragePageModel {
  storageItemsCount: number;
  storageItems: {
    id: number;
    type: string;
    content: string;
    image: MediaResponseGql;
    imageList: MediaResponseGql[];
  }[];
}

export interface NumberDictionary {
  [key: number]: string;
}
