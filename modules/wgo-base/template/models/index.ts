import { ParseTemplateModel } from "./ParseTemplateModel";

export interface ITemplateTokens {
  [key: string]: string;
}

export interface ITemplateArg {
  cicleParse?: (
    textCicle: string,
    tokens: ITemplateTokens[],
    templateService: ParseTemplateModel
  ) => string;
  tokens: ITemplateTokens[];
}