import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../../../wgo/database';
import { FinanceIndexContentInputsGQL } from './IndexContentInputsGQL';
import { IndexContentModel } from './IndexContentModel';
import { FinanceIndexContentResponseGQL } from './IndexContentResponsesGQL';

@Resolver()
export class IndexContentResolver {
  private indexContent: IndexContentModel;

  /**
   *
   */
  constructor() {
    const conn = GetConnection();
    this.indexContent = new IndexContentModel(conn);
  }

  @Query(() => FinanceIndexContentResponseGQL)
  async getFinanceIndexContent(@Arg('urlApi') urlApi: string) {
    return await this.indexContent.getFinanceIndexContent(urlApi);
  }

  @Mutation(() => Boolean)
  async setFinanceIndexContent(@Arg('data') data: FinanceIndexContentInputsGQL) {
    return await this.indexContent.setFinanceIndexContent(data);
  }
}
