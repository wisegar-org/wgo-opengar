import { MediaEntity } from '@wisegar-org/wgo-opengar-core';
import { Connection, Repository } from 'typeorm';
import { LanguageEntity } from '../database/entities/LanguageEntity';

export interface ILanguage {
  id: number;
  code: string;
  enabled: boolean;
  default: boolean;
  logoId: number;
}

export class LanguageService {
  languageRepository: Repository<LanguageEntity>;
  mediaRepository: Repository<MediaEntity>;
  /**
   *
   */
  constructor(conn: Connection) {
    this.languageRepository = conn.getRepository(LanguageEntity);
    this.mediaRepository = conn.getRepository(MediaEntity);
  }

  async all(whitRelations: boolean = false) {
    const language = await this.languageRepository.find({
      // relations: ['logo'],
      relations: whitRelations ? ['logo'] : [],
    });

    return language;
  }

  async create(language: ILanguage) {
    let lang = await this.languageRepository.findOne({
      where: { code: language.code },
    });
    if (!!lang) return false;

    lang = new LanguageEntity();
    return !!(await this.setProperties(lang, language));
  }

  async modify(language: ILanguage) {
    let lang = await this.languageRepository.findOne({
      where: {
        id: language.id,
      },
    });
    if (!language) return false;
    return !!(await this.setProperties(lang, language));
  }

  private async setProperties(lang: LanguageEntity, language: ILanguage) {
    lang.code = language.code;
    lang.default = language.default;
    lang.enabled = language.enabled;
    if (language.logoId) {
      const media = await this.mediaRepository.findOne({
        id: language.logoId,
      });
      lang.logo = media;
    }
    return await this.languageRepository.manager.save(lang);
  }
}
