import { Arg, Query, Resolver } from 'type-graphql';
import { DBConector } from '../database';
import { TranslationService } from '../services/TranslationService';
import { TranslationFilterInputGQL, TranslationFilterPageResponseGQL } from '../modules';

@Resolver()
export class TranslationResolver {
  private translationService: TranslationService;
  constructor() {
    const conn = DBConector.GetConnection();
    this.translationService = new TranslationService(conn);
  }

  @Query(() => [TranslationFilterPageResponseGQL])
  async getTranslationByFilter(@Arg('data') data: TranslationFilterInputGQL) {
    const result = await this.translationService.getTranslationsByFilter(
      data.languageCode,
      data.search,
      data.skip,
      data.take
    );
    return <TranslationFilterPageResponseGQL>{
      ...result,
    };
  }
}
