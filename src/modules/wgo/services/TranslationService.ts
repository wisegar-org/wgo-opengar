import fs, { readFileSync, WriteStream, unlinkSync } from 'fs';
import { join } from 'path';
import { UploadedFile } from 'express-fileupload';
import { Repository, ILike, Connection } from 'typeorm';
import { GetPublicFilesPath } from '../settings/ConfigService';
import TranslationEntity from '../database/entities/TranslationEntity';
import { LanguageEntity } from '../database/entities/LanguageEntity';
import { LanguageService } from './LanguageService';

export type TransaltionsType = {
  [key: string]: string;
};
export type CultureTranslation = {
  [key: string]: string;
};
export type TranslationsByCulture = {
  [key: string]: CultureTranslation;
};

export class TranslationService {
  translationRepository: Repository<TranslationEntity>;
  languageService: LanguageService;
  /**
   *
   */
  constructor(conn: Connection) {
    this.translationRepository = conn.getRepository(TranslationEntity);
    this.languageService = new LanguageService(conn);
  }

  async getTranslation(lang: string, key: string, trim = true) {
    const translation = await this.translationRepository.findOne({
      where: {
        languageCode: lang,
        key,
      },
    });

    return !translation ? key : trim ? this.removeTags(translation.value) : translation.value;
  }

  private removeTags(str: string) {
    return !str ? '' : str.replace(/(<([^>]+)>)/gi, '');
  }

  async setTranslation(lang: string, key: string, value: string) {
    let translationEntity = await this.translationRepository.findOne({
      where: {
        key,
        language: lang,
      },
    });
    if (!translationEntity) {
      translationEntity = new TranslationEntity();
      translationEntity.key = key;
      translationEntity.languageCode = lang;
    }
    translationEntity.value = value;
    await this.translationRepository.manager.save(translationEntity);
  }

  async getAllTranslations() {
    const translations: TranslationsByCulture = {};
    const translationEntities: TranslationEntity[] = await this.translationRepository.find();
    translationEntities.forEach((tranlation) => {
      if (!(tranlation.key in translations)) {
        translations[tranlation.key] = <CultureTranslation>{};
      }
      translations[tranlation.key][tranlation.languageCode] = tranlation.value;
    });
    return translations;
  }

  async getTranslationsByFilter(lang: string, search: string = '', skip: number = 0, take: number = 10) {
    const searchTranslationskeys: { [key: string]: boolean } = {};
    const translationsFile: TransaltionsType = {};
    const langs: LanguageEntity[] = await this.languageService.all(false);
    for (const language of langs) {
      await this.getKeysByFilterInDB(
        language.code,
        search,
        searchTranslationskeys,
        lang === language.code ? translationsFile : null
      );
    }

    const translationsKeys = Object.keys(searchTranslationskeys);
    const translationsCount = translationsKeys.length;
    const keys = translationsKeys.splice(skip, take);

    const translations: { id: string; value: string; key: string }[] = [];
    keys.forEach((key) => {
      translations.push({
        id: key,
        key: key,
        value: translationsFile[key] || key,
      });
    });

    return {
      translations,
      translationsCount,
    };
  }

  async editTranslation(language: string, cultureId: string, key: string, value: string, save: boolean = true) {
    const message = await this.getTranslation(language, 'WG_Manager_Translator_EditSuccess');
    if (cultureId) {
      const lang = cultureId;
    }

    let translation = await this.translationRepository.findOne({
      where: {
        key,
        language: language,
      },
    });
    if (!translation) {
      translation = new TranslationEntity();
      translation.key = key;
      translation.languageCode = language;
    }
    translation.value = value;
    await this.translationRepository.manager.save(translation);

    return {
      message,
    };
  }

  async importExcel(lang: string, buffer: UploadedFile) {
    const langs: LanguageEntity[] = await this.languageService.all(false);
    const format = ' __*__,';
    const path = GetPublicFilesPath();
    const docType = join(path, buffer.name);
    await buffer.mv(docType);
    let doc: string = readFileSync(docType, 'utf-8');
    langs.forEach((lang) => {
      doc = doc.split(`\n${lang.code}`).join(`${format}${lang.code}`);
    });
    const translations = doc.split(format).slice(1);
    const translationsEntity: TranslationEntity[] = [];
    translations.forEach((str) => {
      const trans = str.split(',');
      const translationEntity = new TranslationEntity();
      translationEntity.languageCode = trans[0];
      translationEntity.key = trans[1];
      translationEntity.value = trans[2];
      translationsEntity.push(translationEntity);
    });
    unlinkSync(docType);
    return {
      isSuccess: true,
      message: await this.getTranslation(lang, 'WG_Manager_Translator_ImportSuccess'),
    };
  }

  async exportTranslation(lang: string) {
    const langs: LanguageEntity[] = await this.languageService.all(false);
    const path = GetPublicFilesPath();
    const documentName = 'translations.csv';
    const searchTranslationskeys: { [key: string]: boolean } = {};

    for (const lang of langs) {
      await this.getKeysByFilterInDB(lang.code, '', searchTranslationskeys);
    }

    const writeStream = fs.createWriteStream(join(path, documentName));

    writeStream.write('" Language "," Key "," Value "\n');

    for (const lang of langs) {
      this.writeTranslations(lang.code, searchTranslationskeys, writeStream);
    }

    return {
      message: await this.getTranslation(lang, 'WG_Manager_Translator_ExportSuccess'),
      result: documentName,
      isSuccess: true,
    };
  }

  private async writeTranslations(language: string, keys: { [key: string]: boolean }, writeStream: WriteStream) {
    const translations: TransaltionsType = {};
    const translationsEntities: TranslationEntity[] = await this.translationRepository.find({
      languageCode: language,
    });
    translationsEntities.forEach((translation) => {
      translations[translation.key] = translation.value;
    });
    Object.keys(keys).forEach((key) => {
      const value = key in translations ? translations[key] : key;
      writeStream.write(`${language},${key},${value}\n`);
    });
  }

  private getKeysByFilter(
    translationsFile: TransaltionsType,
    filter = '',
    searchTranslationskeys: { [key: string]: boolean }
  ) {
    const search = filter.toLowerCase();
    Object.keys(translationsFile).map((key) => {
      if (
        !(key in searchTranslationskeys) &&
        (!search ||
          key.toLowerCase().indexOf(search) !== -1 ||
          translationsFile[key].toLowerCase().indexOf(search) !== -1)
      ) {
        searchTranslationskeys[key] = true;
      }
    });
  }

  private async getKeysByFilterInDB(
    language: string,
    filter = '',
    searchTranslationskeys: { [key: string]: boolean },
    translationFile: TransaltionsType | null = null
  ) {
    const search = filter.toLowerCase();
    const filterLanguage = { language: language };
    const translations = await this.translationRepository.find({
      where: search
        ? [
            { ...filterLanguage, key: ILike(`%${search}%`) },
            { ...filterLanguage, value: ILike(`%${search}%`) },
          ]
        : filterLanguage,
    });
    translations.forEach((translation) => {
      searchTranslationskeys[translation.key] = true;
      if (translationFile) {
        translationFile[translation.key] = translation.value;
      }
    });
  }

  async removeTranslation(key: string) {
    const translations = await this.translationRepository.find({
      key,
    });

    await Promise.all(
      translations.map(async (translation) => {
        return await this.translationRepository.manager.remove(translation);
      })
    );
  }
}
