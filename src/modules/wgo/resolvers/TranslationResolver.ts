import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../database';
import { TranslationService } from '../services/TranslationService';
import {
  GetListTranslationsInputGQL,
  GetListTranslationsResponseGQL,
  GetTranslationInputGQL,
  ImportTranslationsInputGQL,
  TranslationExportResponseGQL,
  TranslationFilterInputGQL,
  TranslationFilterPageResponseGQL,
  TranslationInputGQL,
} from '../modules';
import { ContentModel } from '../models/ContentModel';

@Resolver()
export class TranslationResolver {
  private translationService: TranslationService;
  private contentModel: ContentModel;
  constructor() {
    const conn = GetConnection();
    this.translationService = new TranslationService(conn);
    this.contentModel = new ContentModel(conn);
  }

  @Query(() => TranslationFilterPageResponseGQL)
  async getTranslationByFilter(@Arg('data') data: TranslationFilterInputGQL) {
    const result = await this.translationService.getTranslationsByFilter(
      data.languageId,
      data.search,
      data.skip,
      data.take
    );
    return <TranslationFilterPageResponseGQL>{
      ...result,
    };
  }

  @Query(() => String)
  async getTranslation(@Arg('data') data: GetTranslationInputGQL) {
    const result = await this.translationService.getTranslation(data.languageId, data.key, false);
    return result;
  }

  @Mutation(() => Boolean)
  async setTranslation(@Arg('data') data: TranslationInputGQL) {
    const result = await this.translationService.setTranslation(data.languageId, data.key, data.value);
    return result;
  }

  @Query(() => TranslationExportResponseGQL)
  async exportTranslations() {
    const result = await this.translationService.exportTranslation();
    return result;
  }

  @Mutation(() => Boolean)
  async importTranslations(@Arg('data') data: ImportTranslationsInputGQL) {
    const result = await this.translationService.importTranslations(data.languageId, await data.file);
    return result.isSuccess;
  }

  @Query(() => GetListTranslationsResponseGQL)
  async getTranslationsContent(@Arg('data') data: GetListTranslationsInputGQL) {
    const result = await this.contentModel.getContent(data);
    return result;
  }
}
