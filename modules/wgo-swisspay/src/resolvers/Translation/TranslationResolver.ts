import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { DataSource } from 'typeorm';
import { PostgresDataSource } from '../../dataSources';
import { TranslationResponse } from './TranslationResponses';
import { TranslationModel } from '../../wgo-base/translation/models/TranslationModel';
import {
  TRANSLATION_PATH_DELETE_TRANSLATION,
  TRANSLATION_PATH_EXPORT_TRANSLATION,
  TRANSLATION_PATH_GET_ALL_BY_KEYS,
  TRANSLATION_PATH_GET_ALL_TRANSLATION,
  TRANSLATION_PATH_IMPORT_TRANSLATION,
  TRANSLATION_PATH_SET_TRANSLATION,
} from '../../wgo-base/translation/router/server';
import {
  DeleteTranslationInput,
  ExportTranslationInput,
  GetAllTranslationInput,
  GetTranslationByKeysInput,
  ImportTranslationsInput,
  SetTranslationInput,
} from './TranslationInputs';

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

  @Mutation(() => [TranslationResponse], { name: TRANSLATION_PATH_SET_TRANSLATION })
  async setTranslation(@Arg('data') data: SetTranslationInput) {
    const translationModel = new TranslationModel(this.dataSource);
    if (data.translation) {
      const translation = await translationModel.setTranslation(
        data.translation.languageId,
        data.translation.key,
        data.translation.value
      );
      return [translation];
    } else if (data.translations) {
      const result: TranslationResponse[] = [];
      for (const translation of data.translations) {
        const translationResult = await translationModel.setTranslation(
          translation.languageId,
          translation.key,
          translation.value
        );
        result.push(translationResult);
      }
      return result;
    }

    return [];
  }

  @Mutation(() => Boolean, { name: TRANSLATION_PATH_DELETE_TRANSLATION })
  async deleteTranslation(@Arg('data') data: DeleteTranslationInput) {
    const translationModel = new TranslationModel(this.dataSource);
    return await translationModel.deleteTranslation(data.key);
  }

  @Query(() => String, { name: TRANSLATION_PATH_EXPORT_TRANSLATION })
  async exportTranslations(@Arg('data') data: ExportTranslationInput) {
    const translationModel = new TranslationModel(this.dataSource);
    const result = await translationModel.exportTranslations(data.languagesId || []);
    return result;
  }

  @Mutation(() => Boolean, { name: TRANSLATION_PATH_IMPORT_TRANSLATION })
  async importTranslations(@Arg('data') data: ImportTranslationsInput) {
    const translationModel = new TranslationModel(this.dataSource);
    const file = await data.file;
    const result = await translationModel.inportTranslations(file);
    return result;
  }
}
