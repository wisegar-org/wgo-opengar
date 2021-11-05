import { LanguageService, TranslationService } from '@wisegar-org/wgo-opengar-core';
import { Connection } from 'typeorm';
import { GetListTranslationsInputGQL, GetListTranslationsResponseGQL, ItemTranslationsResponseGQL } from '../modules';

export class ContentModel {
  translationService: TranslationService;
  languageService: LanguageService;
  /**
   *
   */
  constructor(conn: Connection) {
    this.translationService = new TranslationService(conn);
    this.languageService = new LanguageService(conn);
  }

  async getContent(arg: GetListTranslationsInputGQL) {
    const itemsResult: ItemTranslationsResponseGQL[] = [];
    for (const item of arg.items) {
      const translation = await this.translationService.getTranslation(arg.languageId, item.key, item.trim);
      if (translation === item.key) {
        await this.translationService.setTranslation(arg.languageId, item.key, translation);
      }
      itemsResult.push(<ItemTranslationsResponseGQL>{ key: item.key, value: translation });
    }
    return <GetListTranslationsResponseGQL>{ items: itemsResult };
  }
}
