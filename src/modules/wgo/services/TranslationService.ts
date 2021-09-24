import fs, { readFileSync, WriteStream, unlinkSync } from 'fs-extra';
import { join } from 'path';
import { UploadedFile } from 'express-fileupload';
import { Repository, ILike, Connection } from 'typeorm';
import { GetPrivateFilesPath, GetPublicFilesPath } from '../settings/ConfigService';
import { LanguageService } from './LanguageService';
import { LanguageEntity, TranslationEntity } from '@wisegar-org/wgo-opengar-core';

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

  async getTranslation(lang: number, key: string, trim = true) {
    const translation = await this.translationRepository.findOne({
      where: {
        languageId: lang,
        key,
      },
    });

    return !translation ? key : trim ? this.removeTags(translation.value) : translation.value;
  }

  private removeTags(str: string) {
    return !str ? '' : str.replace(/(<([^>]+)>)/gi, '');
  }

  async setTranslation(lang: number, key: string, value: string) {
    let translationEntity = await this.translationRepository.findOne({
      where: {
        key,
        languageId: lang,
      },
    });
    if (!translationEntity) {
      translationEntity = new TranslationEntity();
      translationEntity.key = key;
    }
    const language = await this.languageService.getLanguageById(lang);
    if (language) {
      translationEntity.languageId = lang;
      translationEntity.language = language;
    }
    translationEntity.value = value;
    return !!(await this.translationRepository.manager.save(translationEntity));
  }

  async getAllTranslations() {
    const translations: TranslationsByCulture = {};
    const translationEntities: TranslationEntity[] = await this.translationRepository.find();
    translationEntities.forEach((tranlation) => {
      if (!(tranlation.key in translations)) {
        translations[tranlation.key] = <CultureTranslation>{};
      }
      translations[tranlation.key][tranlation.languageId] = tranlation.value;
    });
    return translations;
  }

  async getTranslationsByFilter(lang: number, search: string = '', skip: number = 0, take: number = 10) {
    const searchTranslationskeys: { [key: string]: boolean } = {};
    const translationsFile: TransaltionsType = {};
    const langs: LanguageEntity[] = await this.languageService.all(false);
    for (const language of langs) {
      await this.getKeysByFilterInDB(
        language.id,
        search,
        searchTranslationskeys,
        lang === language.id ? translationsFile : null
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

  async editTranslation(langId: number, cultureId: number, key: string, value: string, save: boolean = true) {
    const message = await this.getTranslation(langId, 'WG_Manager_Translator_EditSuccess');

    let translation = await this.translationRepository.findOne({
      where: {
        key,
        languageId: langId,
      },
    });
    if (!translation) {
      translation = new TranslationEntity();
      translation.key = key;
      translation.languageId = langId;
    }
    translation.value = value;
    await this.translationRepository.manager.save(translation);

    return {
      message,
    };
  }

  async importExcel(lang: number, buffer: UploadedFile) {
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
      translationEntity.languageId = parseInt(trans[0]);
      translationEntity.key = trans[2];
      translationEntity.value = trans[3];
      translationsEntity.push(translationEntity);
    });
    unlinkSync(docType);
    return {
      isSuccess: true,
      message: await this.getTranslation(lang, 'WG_Manager_Translator_ImportSuccess'),
    };
  }

  async exportTranslation() {
    const langs: LanguageEntity[] = await this.languageService.all(false);
    const path = GetPrivateFilesPath();
    const documentName = 'translations.csv';
    const searchTranslationskeys: { [key: string]: boolean } = {};

    for (const lang of langs) {
      if (lang.enabled) {
        await this.getKeysByFilterInDB(lang.id, '', searchTranslationskeys);
      }
    }

    const pathDoc = join(join(path, documentName));
    const writeStream = fs.createWriteStream(pathDoc);

    writeStream.write('"Language Id"," Language "," Key "," Value ",\n');

    for (const lang of langs) {
      if (lang.enabled) {
        await this.writeTranslations(lang, searchTranslationskeys, writeStream);
      }
    }

    writeStream.close();
    const storedFileContent = readFileSync(pathDoc);

    return {
      data: storedFileContent.toString('base64'),
      isSuccess: true,
    };
  }

  private async writeTranslations(
    language: LanguageEntity,
    keys: { [key: string]: boolean },
    writeStream: WriteStream
  ) {
    const translations: TransaltionsType = {};
    const translationsEntities: TranslationEntity[] = await this.translationRepository.find({
      languageId: language.id,
    });
    translationsEntities.forEach((translation) => {
      translations[translation.key] = translation.value;
    });
    Object.keys(keys).forEach((key) => {
      const value = key in translations && !!translations[key] ? translations[key] : key;
      writeStream.write(`${language.id},${language.code},${key},${value}\n`);
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
    language: number,
    filter = '',
    searchTranslationskeys: { [key: string]: boolean },
    translationFile: TransaltionsType | null = null
  ) {
    const search = filter.toLowerCase();
    const filterLanguage = { languageId: language };
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
