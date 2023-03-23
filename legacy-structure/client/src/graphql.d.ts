export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AgvEventInput = {
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  class: Scalars['String'];
  type: Scalars['String'];
  state: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  visible: Scalars['Boolean'];
  enrollment: Scalars['Boolean'];
  imgTitle?: Maybe<Scalars['Int']>;
  imgList?: Maybe<Array<Scalars['Int']>>;
};

export type AgvEventResponse = {
  __typename?: 'AGVEventResponse';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  class: Scalars['String'];
  type: Scalars['String'];
  state: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  visible: Scalars['Boolean'];
  enrollment: Scalars['Boolean'];
  inscriptions: Scalars['Float'];
  imgTitle?: Maybe<MediaResponseGql>;
  imgList?: Maybe<Array<MediaResponseGql>>;
};

export type AgvInscriptionInput = {
  id: Scalars['Float'];
  nome: Scalars['String'];
  cognome: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  message: Scalars['String'];
  class: Scalars['String'];
  eventId: Scalars['Int'];
};

export type AgvInscriptionResponse = {
  __typename?: 'AGVInscriptionResponse';
  id: Scalars['Float'];
  nome: Scalars['String'];
  cognome: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  message: Scalars['String'];
  class: Scalars['String'];
  date: Scalars['DateTime'];
  eventId: Scalars['Float'];
  eventTitle: Scalars['String'];
  eventClass: Scalars['String'];
  event: AgvEventResponse;
};

export type CasinaIndexContentInputsGql = {
  imageId: Scalars['Float'];
  translations: Array<TranslationInputGql>;
};

export type CasinaIndexContentResponseGql = {
  __typename?: 'CasinaIndexContentResponseGQL';
  image?: Maybe<MediaResponseGql>;
};

export type ContactInputGql = {
  contactName?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  mapPath?: Maybe<Scalars['String']>;
};

export type ContactResponseGql = {
  __typename?: 'ContactResponseGQL';
  contactName: Scalars['String'];
  address: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  mapPath: Scalars['String'];
};


export type EmailFromToAppInputGql = {
  subject: Scalars['String'];
  body: Scalars['String'];
};

export type EmailGql = {
  __typename?: 'EmailGQL';
  subject: Scalars['String'];
  body: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
};

export type EmailInputGql = {
  subject: Scalars['String'];
  body: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
};

export type EmailResponseGql = {
  __typename?: 'EmailResponseGQL';
  isSuccess: Scalars['Boolean'];
  result?: Maybe<EmailGql>;
  message?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type EmailToAddressAndAppInputGql = {
  subject: Scalars['String'];
  body: Scalars['String'];
  to: Scalars['String'];
};

export type EmailToAppInputGql = {
  subject: Scalars['String'];
  body: Scalars['String'];
  from: Scalars['String'];
};

export type FinanceIndexContentInputsGql = {
  imageId: Scalars['Float'];
  translations: Array<TranslationInputGql>;
};

export type FinanceIndexContentResponseGql = {
  __typename?: 'FinanceIndexContentResponseGQL';
  image?: Maybe<MediaResponseGql>;
};

export type GetListTranslationsInputGql = {
  languageId: Scalars['Float'];
  items: Array<ItemTranslationsInputGql>;
};

export type GetListTranslationsResponseGql = {
  __typename?: 'GetListTranslationsResponseGQL';
  items: Array<ItemTranslationsResponseGql>;
};

export type GetTranslationInputGql = {
  languageId: Scalars['Float'];
  key: Scalars['String'];
};

export type ImportTranslationsInputGql = {
  /** File uploaded */
  file: Scalars['Upload'];
  /** Language id */
  languageId: Scalars['Float'];
};

export type ItemTranslationsInputGql = {
  key: Scalars['String'];
  trim: Scalars['Boolean'];
};

export type ItemTranslationsResponseGql = {
  __typename?: 'ItemTranslationsResponseGQL';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type LanguageInputGql = {
  id?: Maybe<Scalars['Float']>;
  code: Scalars['String'];
  default: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  logoId?: Maybe<Scalars['Float']>;
};

export type LanguageResponseGql = {
  __typename?: 'LanguageResponseGQL';
  id: Scalars['Float'];
  code: Scalars['String'];
  default: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  logo?: Maybe<MediaResponseGql>;
};

export type LoginModelInputGql = {
  userName: Scalars['String'];
  password: Scalars['String'];
};

export type MediaInputGql = {
  /** File uploaded */
  file: Scalars['Upload'];
  /** Flag public file */
  isPublic: Scalars['Boolean'];
};

export type MediaResponseGql = {
  __typename?: 'MediaResponseGQL';
  id?: Maybe<Scalars['Float']>;
  mimetype?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  data?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
};

export type MediasInputGql = {
  /** File uploaded */
  files: Array<MediaInputGql>;
};

export type Mutation = {
  __typename?: 'Mutation';
  setSeoData: Scalars['Boolean'];
  agvCreateEvent: Scalars['Boolean'];
  agvModifyEvent: Scalars['Boolean'];
  agvCreateInscription: Scalars['Boolean'];
  agvModifyInscription: Scalars['Boolean'];
  setContactData: Scalars['Boolean'];
  setCasinaIndexContent: Scalars['Boolean'];
  setWGOContactData: Scalars['Boolean'];
  createStorageItem: Scalars['Boolean'];
  updateStorageItem: Scalars['Boolean'];
  deleteStorageItem: Scalars['Boolean'];
  createLanguage: Scalars['Boolean'];
  modifyLanguage: Scalars['Boolean'];
  saveImage: MediaResponseGql;
  saveFiles: Array<MediaResponseGql>;
  saveFaviconFile: MediaResponseGql;
  addRole: RoleResponseGql;
  updateRole: RoleResponseGql;
  removeRole: RoleResponseGql;
  setTranslation: Scalars['Boolean'];
  importTranslations: Scalars['Boolean'];
  addUser: UserResponseGql;
  setRoles: UserResponseGql;
  login: UserLoginResponseGql;
  updateUser: UserResponseGql;
  setUserLanguage: Scalars['Boolean'];
  removeUser: UserResponseGql;
  confirmUser: Scalars['Boolean'];
  resendConfirmationUser: Scalars['Boolean'];
  setFinanceIndexContent: Scalars['Boolean'];
};


export type MutationSetSeoDataArgs = {
  data: SeoInputGql;
};


export type MutationAgvCreateEventArgs = {
  data: AgvEventInput;
};


export type MutationAgvModifyEventArgs = {
  data: AgvEventInput;
};


export type MutationAgvCreateInscriptionArgs = {
  data: AgvInscriptionInput;
};


export type MutationAgvModifyInscriptionArgs = {
  data: AgvEventInput;
};


export type MutationSetContactDataArgs = {
  data: ContactInputGql;
};


export type MutationSetCasinaIndexContentArgs = {
  data: CasinaIndexContentInputsGql;
};


export type MutationSetWgoContactDataArgs = {
  data: WgoContactInputGql;
};


export type MutationCreateStorageItemArgs = {
  data: StorageInputGql;
};


export type MutationUpdateStorageItemArgs = {
  data: StorageInputGql;
};


export type MutationDeleteStorageItemArgs = {
  id: Scalars['Float'];
};


export type MutationCreateLanguageArgs = {
  data: LanguageInputGql;
};


export type MutationModifyLanguageArgs = {
  data: LanguageInputGql;
};


export type MutationSaveImageArgs = {
  urlApi: Scalars['String'];
  data: MediaInputGql;
};


export type MutationSaveFilesArgs = {
  urlApi: Scalars['String'];
  data: MediasInputGql;
};


export type MutationSaveFaviconFileArgs = {
  urlApi: Scalars['String'];
  data: MediaInputGql;
};


export type MutationAddRoleArgs = {
  data: RoleInputGql;
};


export type MutationUpdateRoleArgs = {
  data: RoleInputGql;
};


export type MutationRemoveRoleArgs = {
  id: Scalars['Float'];
};


export type MutationSetTranslationArgs = {
  data: TranslationInputGql;
};


export type MutationImportTranslationsArgs = {
  data: ImportTranslationsInputGql;
};


export type MutationAddUserArgs = {
  urlApi: Scalars['String'];
  data: UserInputGql;
};


export type MutationSetRolesArgs = {
  data: UserRolesInputGql;
};


export type MutationLoginArgs = {
  data: LoginModelInputGql;
};


export type MutationUpdateUserArgs = {
  data: UserInputGql;
};


export type MutationSetUserLanguageArgs = {
  langId: Scalars['Float'];
  uuid: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  uuid: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationResendConfirmationUserArgs = {
  urlApi: Scalars['String'];
  email: Scalars['String'];
};


export type MutationSetFinanceIndexContentArgs = {
  data: FinanceIndexContentInputsGql;
};

export type Query = {
  __typename?: 'Query';
  getSeoData: SeoResponseGql;
  agvAllEvents: Array<AgvEventResponse>;
  agvAllInscriptions: Array<AgvInscriptionResponse>;
  getContactData: ContactResponseGql;
  getCasinaIndexContent: CasinaIndexContentResponseGql;
  getWGOContactData: WgoContactResponseGql;
  getStorageByType: Array<StorageResponseGql>;
  getStorageByPagination: StoragePageResponseGql;
  serverVersion: Scalars['String'];
  sendEmail: EmailResponseGql;
  sendEmailToApp: EmailResponseGql;
  sendEmailFromToApp: EmailResponseGql;
  sendEmailFromToAddressAndApp: EmailResponseGql;
  allLanguage: Array<LanguageResponseGql>;
  getFile: MediaResponseGql;
  roles: RoleListResponseGql;
  role: RoleResponseGql;
  roleById: RoleResponseGql;
  getTranslationByFilter: TranslationFilterPageResponseGql;
  getTranslation: Scalars['String'];
  exportTranslations: TranslationExportResponseGql;
  getTranslationsContent: GetListTranslationsResponseGql;
  users: UserListResponseGql;
  user: UserResponseGql;
  userById: UserResponseGql;
  userByUuid: UserResponseGql;
  getFinanceIndexContent: FinanceIndexContentResponseGql;
};


export type QueryGetSeoDataArgs = {
  urlApi: Scalars['String'];
};


export type QueryAgvAllEventsArgs = {
  urlApi: Scalars['String'];
};


export type QueryGetCasinaIndexContentArgs = {
  urlApi: Scalars['String'];
};


export type QueryGetWgoContactDataArgs = {
  module: Scalars['String'];
};


export type QueryGetStorageByTypeArgs = {
  data: StorageAllInputGql;
};


export type QueryGetStorageByPaginationArgs = {
  data: StoragePageInputGql;
};


export type QuerySendEmailArgs = {
  data: EmailInputGql;
};


export type QuerySendEmailToAppArgs = {
  data: EmailToAppInputGql;
};


export type QuerySendEmailFromToAppArgs = {
  data: EmailFromToAppInputGql;
};


export type QuerySendEmailFromToAddressAndAppArgs = {
  data: EmailToAddressAndAppInputGql;
};


export type QueryAllLanguageArgs = {
  urlApi: Scalars['String'];
};


export type QueryGetFileArgs = {
  id: Scalars['Float'];
};


export type QueryRolesArgs = {
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryRoleArgs = {
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryRoleByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetTranslationByFilterArgs = {
  data: TranslationFilterInputGql;
};


export type QueryGetTranslationArgs = {
  data: GetTranslationInputGql;
};


export type QueryGetTranslationsContentArgs = {
  data: GetListTranslationsInputGql;
};


export type QueryUsersArgs = {
  id?: Maybe<Scalars['Float']>;
  uuid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Float']>;
  uuid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['Float'];
};


export type QueryUserByUuidArgs = {
  uuid: Scalars['String'];
};


export type QueryGetFinanceIndexContentArgs = {
  urlApi: Scalars['String'];
};

export type RoleGql = {
  __typename?: 'RoleGQL';
  id?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  users?: Maybe<Array<UserGql>>;
};

export type RoleInputGql = {
  id?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type RoleListResponseGql = {
  __typename?: 'RoleListResponseGQL';
  isSuccess: Scalars['Boolean'];
  result: Array<RoleGql>;
  message?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type RoleResponseGql = {
  __typename?: 'RoleResponseGQL';
  isSuccess: Scalars['Boolean'];
  result?: Maybe<RoleGql>;
  message?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type SeoInputGql = {
  module: Scalars['String'];
  path: Scalars['String'];
  meta: Array<SeoMetaInputGql>;
};

export type SeoMetaInputGql = {
  name?: Maybe<Scalars['String']>;
  property?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type SeoMetaResponseGql = {
  __typename?: 'SeoMetaResponseGQL';
  name: Scalars['String'];
  property: Scalars['String'];
  content: Scalars['String'];
  type: Scalars['String'];
};

export type SeoResponseGql = {
  __typename?: 'SeoResponseGQL';
  module: Scalars['String'];
  path: Scalars['String'];
  meta: Array<SeoMetaResponseGql>;
  favicon?: Maybe<MediaResponseGql>;
};

export type StorageAllInputGql = {
  lang: Scalars['Float'];
  loadTranslations?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  urlApi: Scalars['String'];
  search?: Maybe<Scalars['String']>;
};

export type StorageInputGql = {
  id: Scalars['Float'];
  type: Scalars['String'];
  content: Scalars['String'];
  image?: Maybe<Scalars['Int']>;
  imageList?: Maybe<Array<Scalars['Int']>>;
};

export type StoragePageInputGql = {
  lang: Scalars['Float'];
  loadTranslations?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
  type: Scalars['String'];
  urlApi: Scalars['String'];
  search?: Maybe<Scalars['String']>;
};

export type StoragePageResponseGql = {
  __typename?: 'StoragePageResponseGQL';
  storageItemsCount: Scalars['Float'];
  storageItems: Array<StorageResponseGql>;
};

export type StorageResponseGql = {
  __typename?: 'StorageResponseGQL';
  id: Scalars['Float'];
  type: Scalars['String'];
  content: Scalars['String'];
  image?: Maybe<MediaResponseGql>;
  imageList?: Maybe<Array<MediaResponseGql>>;
};

export type TranslationExportResponseGql = {
  __typename?: 'TranslationExportResponseGQL';
  data: Scalars['String'];
  isSuccess: Scalars['Boolean'];
};

export type TranslationFilterInputGql = {
  languageId: Scalars['Float'];
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
};

export type TranslationFilterPageResponseGql = {
  __typename?: 'TranslationFilterPageResponseGQL';
  translationsCount: Scalars['Float'];
  translations: Array<TranslationFilterResponseGql>;
};

export type TranslationFilterResponseGql = {
  __typename?: 'TranslationFilterResponseGQL';
  id: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
};

export type TranslationInputGql = {
  languageId: Scalars['Float'];
  key: Scalars['String'];
  value: Scalars['String'];
};


export type UserGql = {
  __typename?: 'UserGQL';
  id: Scalars['Float'];
  uuid: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
  isEmailConfirmed: Scalars['Boolean'];
  roles: Array<RoleGql>;
  languageId?: Maybe<Scalars['Float']>;
  language?: Maybe<LanguageResponseGql>;
};

export type UserInputGql = {
  id?: Maybe<Scalars['Float']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['Float']>>;
  isEmailConfirmed: Scalars['Boolean'];
};

export type UserListResponseGql = {
  __typename?: 'UserListResponseGQL';
  isSuccess: Scalars['Boolean'];
  result: Array<UserGql>;
  message?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type UserLoginResponseGql = {
  __typename?: 'UserLoginResponseGQL';
  isSuccess: Scalars['Boolean'];
  result?: Maybe<UserLoginToken>;
  message?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type UserLoginToken = {
  __typename?: 'UserLoginToken';
  token?: Maybe<Scalars['String']>;
  user: UserGql;
};

export type UserResponseGql = {
  __typename?: 'UserResponseGQL';
  isSuccess: Scalars['Boolean'];
  result?: Maybe<UserGql>;
  message?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type UserRolesInputGql = {
  userUuid: Scalars['String'];
  roleIds: Array<Scalars['Float']>;
};

export type WgoContactInputGql = {
  module?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  mapPath?: Maybe<Scalars['String']>;
};

export type WgoContactResponseGql = {
  __typename?: 'WGOContactResponseGQL';
  module: Scalars['String'];
  contactName: Scalars['String'];
  address: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  mapPath: Scalars['String'];
};
