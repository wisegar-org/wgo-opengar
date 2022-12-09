export * from "./constants";

export interface ILanguagePostArg {
  code: string;
  enabled: boolean;
  default: boolean;
}

export interface ILanguageModel extends ILanguagePostArg {
  id: number;
}
