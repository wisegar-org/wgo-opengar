import { DataSource, ILike } from "typeorm";
import { ILanguageModel } from "../../language/models";
import { LanguageModel } from "../../language/models/LanguageModel";
import { TranslationEntity } from "../database/entities/TranslationEntity";
import {
  IGetAllTranslationsByKeyArg,
  IGetAllTranslationArg,
  ITransaltionsType,
  ITranslationModel,
} from ".";
import { UtilService } from "../../core/services/UtilService";

export class TranslationModel {
  private dataSoure: DataSource;

  /**
   *
   */
  constructor(dataSource: DataSource) {
    this.dataSoure = dataSource;
  }

  async getAllTranslation(data: IGetAllTranslationArg) {
    const translations = await this.getTranslationsByFilter(
      data.languageId,
      data.search
    );
    return translations;
  }

  async getAllTranslationByKeys(data: IGetAllTranslationsByKeyArg) {
    const translations: ITranslationModel[] = [];
    for (const key of data.keys) {
      translations.push(await this.getTranslation(data.languageId, key));
    }
    return translations;
  }

  async getTranslation(lang: number, key: string) {
    const translationRepository =
      this.dataSoure.getRepository(TranslationEntity);
    let translation = await translationRepository.findOne({
      where: {
        key: key,
        languageId: lang,
      },
    });
    if (!translation) {
      translation = new TranslationEntity();
      translation.key = key;
      translation.value = key;
      translation.languageId = lang;

      translation = await translationRepository.save(translation);
    }

    return this.mapTranslationEntity(translation);
  }

  async setTranslation(lang: number, key: string, value: string) {
    const translationRepository =
      this.dataSoure.getRepository(TranslationEntity);
    let translation = await translationRepository.findOne({
      where: {
        key: key,
        languageId: lang,
      },
    });
    if (!translation) {
      translation = new TranslationEntity();
      translation.key = key;
      translation.languageId = lang;
    }
    translation.value = value;
    translation = await translationRepository.save(translation);

    return this.mapTranslationEntity(translation);
  }

  mapTranslationEntity(translation: TranslationEntity) {
    return {
      id: translation.key,
      key: translation.key,
      languageId: translation.languageId,
      value: translation.value,
    } as ITranslationModel;
  }

  async getTranslationsByFilter(lang: number, search: string = "") {
    const searchTranslationskeys: { [key: string]: boolean } = {};
    const translationsFile: ITransaltionsType = {};
    const languageService = new LanguageModel(this.dataSoure);
    const langs: ILanguageModel[] = await languageService.getAllLanguage();
    for (const language of langs) {
      await this.getKeysByFilterInDB(
        language.id,
        search,
        searchTranslationskeys,
        lang === language.id ? translationsFile : null
      );
    }

    const translationsKeys = Object.keys(searchTranslationskeys);
    const keys = translationsKeys.sort();

    const translations: ITranslationModel[] = [];
    keys.forEach((key) => {
      translations.push({
        id: key,
        key: key,
        value: translationsFile[key] || key,
        languageId: lang,
      });
    });

    return translations;
  }

  async inportTranslations(buffer: any) {
    const languageService = new LanguageModel(this.dataSoure);
    const { createReadStream } = buffer;
    const stream: any = createReadStream();
    const fileContent = await UtilService.readStreamData(stream);

    let doc = Buffer.from(fileContent as any, "base64").toString();
    const format = " __*__,";

    const langs: ILanguageModel[] = await languageService.getAllLanguage();
    const langByCodes: { [key: string]: ILanguageModel } = {};
    langs.forEach((lang) => {
      langByCodes[lang.code] = lang;
    });

    Object.keys(langByCodes).forEach((lang) => {
      doc = doc.split(`\n${lang}`).join(`${format}${lang}`);
    });

    const translations = doc.split(format).slice(1);
    for (const str of translations) {
      const trans = str.split(",");
      const lang = langByCodes[trans[0]];
      if (trans[1] !== trans[2] && !!lang) {
        await this.setTranslation(lang.id, trans[1], trans[2]);
      }
    }

    return true;
  }

  async exportTranslations(langIds: number[]) {
    const searchTranslationskeys: { [key: string]: boolean } = {};
    const translationsFile: { [key: number]: ITransaltionsType } = {};
    const languageService = new LanguageModel(this.dataSoure);
    const langs: ILanguageModel[] = await languageService.getAllLanguage();
    const validLanguages = langs.filter(
      (lang) => langIds.length === 0 || langIds.indexOf(lang.id) !== -1
    );
    for (const language of validLanguages) {
      translationsFile[language.id] = {};
      await this.getKeysByFilterInDB(
        language.id,
        "",
        searchTranslationskeys,
        translationsFile[language.id]
      );
    }

    const translationsKeys = Object.keys(searchTranslationskeys);
    const keys = translationsKeys.sort();

    let result: string = '" Language "," Key "," Value ",\n';
    Object.values(validLanguages).forEach((lang) => {
      keys.forEach((key) => {
        result += `${lang.code},${key},${
          translationsFile[lang.id][key] || key
        },\n`;
      });
    });

    return Buffer.from(result).toString("base64");
  }

  private async getKeysByFilterInDB(
    language: number,
    filter = "",
    searchTranslationskeys: { [key: string]: boolean },
    translationFile: ITransaltionsType | null = null
  ) {
    const search = filter.toLowerCase();
    const filterLanguage = { languageId: language };
    const translationRepository =
      this.dataSoure.getRepository(TranslationEntity);
    const translations = await translationRepository.find({
      where: search
        ? [
            { ...filterLanguage, key: ILike(`%${search}%`) },
            { ...filterLanguage, value: ILike(`%${search}%`) },
          ]
        : filterLanguage,
      order: { key: "DESC" },
    });
    translations.forEach((translation) => {
      searchTranslationskeys[translation.key] = true;
      if (translationFile) {
        translationFile[translation.key] = translation.value;
      }
    });
  }
}
