import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ISeo } from '..';
import { GetConnection } from '../../database';
import { SeoInputGQL } from './SeoInputsGQL';
import { SeoModel } from './SeoModel';
import { SeoResponseGQL } from './SeoResponseGQL';

@Resolver()
export class SeoResolver {
  seoModel: SeoModel;
  /**
   *
   */
  constructor() {
    const conn = GetConnection();
    this.seoModel = new SeoModel(conn);
  }
  @Query(() => SeoResponseGQL)
  async getSeoData(@Arg('urlApi') urlApi: String) {
    const result = await this.seoModel.getSeoData(urlApi as string);
    return result as SeoResponseGQL;
  }

  @Mutation(() => Boolean)
  async setSeoData(@Arg('data') data: SeoInputGQL) {
    const result = await this.seoModel.setSeoData(data as ISeo);
    return result;
  }
}
