import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../../../wgo/database';
import { CasinaIndexContentInputsGQL } from './IndexContentInputsGQL';
import { IndexContentModel } from './IndexContentModel';
import { CasinaIndexContentResponseGQL } from './IndexContentResponsesGQL';

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

  @Query(() => CasinaIndexContentResponseGQL)
  async getCasinaIndexContent(@Arg('urlApi') urlApi: string) {
    return await this.indexContent.getCasinaIndexContent(urlApi);
  }

  @Mutation(() => Boolean)
  async setCasinaIndexContent(@Arg('data') data: CasinaIndexContentInputsGQL) {
    return await this.indexContent.setCasinaIndexContent(data);
  }
}
