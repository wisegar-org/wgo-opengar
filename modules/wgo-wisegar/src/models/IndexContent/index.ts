import { IMediaModel } from "../../wgo-base/core/models";
import { ITranslationArg } from "../../wgo-base/translation/models";

export interface IIndexContentModel {
  image: IMediaModel;
}

export interface IIndexContentInput {
  imageId: number;
  translations: ITranslationArg[];
}
