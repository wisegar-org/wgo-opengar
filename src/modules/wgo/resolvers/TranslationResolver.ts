import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../database';
import { TranslationService } from '../services/TranslationService';
import {
  GetTranslationInputGQL,
  TranslationExportResponseGQL,
  TranslationFilterInputGQL,
  TranslationFilterPageResponseGQL,
  TranslationInputGQL,
} from '../modules';

@Resolver()
export class TranslationResolver {
  private translationService: TranslationService;
  constructor() {
    const conn = GetConnection();
    this.translationService = new TranslationService(conn);
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
}
