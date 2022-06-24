import { Arg, Mutation, Query, Resolver, Authorized } from 'type-graphql';
import { PostgresDataSource } from '../../../dataSources';
import { DataSource } from 'typeorm';
import { LanguageResponse } from './LanguageResponses';
import { LanguageInput, LanguagePostInput } from './LanguageInputs';
import { LanguageModel } from '../../../../wgo-base/language/models/LanguageModel';
import { IdInput } from '../Core/CoreInputs';

@Resolver()
export class LanguageResolver {
  dataSource: DataSource;
  /**
   *
   */
  constructor() {
    this.dataSource = PostgresDataSource;
  }

  @Query(() => [LanguageResponse])
  async getAllLanguage() {
    const languageModel = new LanguageModel(this.dataSource);
    const languages = await languageModel.getAllLanguage();
    return languages;
  }

  @Query(() => LanguageResponse)
  async getLanguage(@Arg('data') data: IdInput) {
    const languageModel = new LanguageModel(this.dataSource);
    const language = await languageModel.getLanguage(data);
    return language;
  }

  @Authorized()
  @Mutation(() => LanguageResponse)
  async postLanguage(@Arg('data') data: LanguagePostInput) {
    const languageModel = new LanguageModel(this.dataSource);
    const language = await languageModel.postLanguage(data);
    return language;
  }

  @Authorized()
  @Mutation(() => LanguageResponse)
  async putLanguage(@Arg('data') data: LanguageInput) {
    const languageModel = new LanguageModel(this.dataSource);
    const language = await languageModel.putLanguage(data);
    return language;
  }
}
