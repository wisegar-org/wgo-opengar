import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { DataSource } from 'typeorm';
import { PostgresDataSource } from '../../../dataSources';
import { TranslationResponse } from './TranslationResponses';
import { TranslationModel } from '../../../../wgo-base/translation/models/TranslationModel';
import {
  TRANSLATION_PATH_GET_ALL_BY_KEYS,
  TRANSLATION_PATH_GET_ALL_TRANSLATION,
  TRANSLATION_PATH_SET_TRANSLATION,
} from '../../../../wgo-base/translation/router/server';
import { GetAllTranslationInput, GetTranslationByKeysInput, SetTranslationInput } from './TranslationInputs';

@Resolver()
export class TranslationResolver {
  dataSource: DataSource;
  /**
   *
   */
  constructor() {
    this.dataSource = PostgresDataSource;
  }

  @Query(() => [TranslationResponse], { name: TRANSLATION_PATH_GET_ALL_TRANSLATION })
  async getAllTranslations(@Arg('data') data: GetAllTranslationInput) {
    const translationModel = new TranslationModel(this.dataSource);
    const translations = await translationModel.getAllTranslation(data);
    return translations;
  }

  @Query(() => [TranslationResponse], { name: TRANSLATION_PATH_GET_ALL_BY_KEYS })
  async getAllTranslationsByKey(@Arg('data') data: GetTranslationByKeysInput) {
    const translationModel = new TranslationModel(this.dataSource);
    const translations = await translationModel.getAllTranslationByKeys(data);
    return translations;
  }

  @Mutation(() => TranslationResponse, { name: TRANSLATION_PATH_SET_TRANSLATION })
  async setTranslation(@Arg('data') data: SetTranslationInput) {
    const translationModel = new TranslationModel(this.dataSource);
    const translation = await translationModel.setTranslation(data.languageId, data.key, data.value);
    return translation;
  }
}
