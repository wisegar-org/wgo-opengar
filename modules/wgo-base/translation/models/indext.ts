export interface ITranslationModel {
  id: string;
  value: string;
  key: string;
  languageId: number;
}

export interface IGetAllTranslationArg {
  languageId: number;
  search?: string;
}

export interface IGetAllTranslationsByKey {
  languageId: number;
  keys: string[];
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
