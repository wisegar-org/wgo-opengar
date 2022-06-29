export interface ITranslationModel {
  id: string;
  value: string;
  key: string;
  languageId: number;
}

export interface ITranslationListModel<T> {
  [key: string]: T;
}

export interface IGetAllTranslationArg {
  languageId: number;
  search?: string;
}

export interface IGetAllTranslationsByKeyArg {
  languageId: number;
  keys: string[];
}

export interface ITranslationArg {
  languageId: number;
  key: string;
  value: string;
}

export interface ISetTranslationArg {
  translation?: ITranslationArg;
  translations?: ITranslationArg[];
}

export interface ITransaltionsType {
  [key: string]: string;
}

export interface ICultureTranslation {
  [key: string]: string;
}

export interface ITranslationsByCulture {
  [key: string]: ICultureTranslation;
}