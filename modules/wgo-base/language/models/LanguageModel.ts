import { DataSource } from "typeorm";
import { ILanguagePostArg, ILanguageModel } from ".";
import { IIdInput } from "../../core/models";
import { IContextBase } from "../../core/models/context";
import { HistoricModel } from "../../historic/models/HistoricModel";
import { LanguageEntity } from "../database/entities/LanguageEntity";
import {
  WRONG_LANGUAGE_CODE,
  WRONG_LANGUAGE_DONT_EXIST,
  WRONG_LANGUAGE_POST,
  WRONG_LANGUAGE_PUT,
} from "./constants";

export class LanguageModel {
  private dataSoure: DataSource;
  private ctx: IContextBase;
  private historicModel: HistoricModel<LanguageEntity>;

  /**
   *
   */
  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.dataSoure = ctx.dataSource;
    this.historicModel = new HistoricModel(LanguageEntity, ctx);
  }

  async getAllLanguage() {
    const repository = this.dataSoure.getRepository(LanguageEntity);
    const languages = await repository.find({
      order: { code: "ASC" },
    });
    return languages.map((lang) => this.mapLanguageEntity(lang));
  }

  async getLanguage(data: IIdInput) {
    const repository = this.dataSoure.getRepository(LanguageEntity);
    const language = await repository.findOne({
      where: { id: data.id },
    });
    if (!!language) this.mapLanguageEntity(language);

    throw new Error(WRONG_LANGUAGE_DONT_EXIST);
  }

  async postLanguage(data: ILanguagePostArg) {
    const repository = this.dataSoure.getRepository(LanguageEntity);
    const languages = await repository.find({
      where: { code: data.code },
    });

    if (languages.length > 0) throw new Error(WRONG_LANGUAGE_CODE);
    if (data.default) await this.unsetDefaultLanguage();

    const languageEntity = new LanguageEntity();
    languageEntity.code = data.code;
    languageEntity.enabled = data.enabled || data.default;
    languageEntity.default = data.default;
    const languageEntityCreated = await repository.save(languageEntity);

    if (!!languageEntityCreated) {
      await this.historicModel.createPostHistoric(languageEntityCreated);
      return this.mapLanguageEntity(languageEntityCreated);
    }

    throw new Error(WRONG_LANGUAGE_POST);
  }

  async putLanguage(data: ILanguageModel) {
    const repository = this.dataSoure.getRepository(LanguageEntity);
    const languageEntity = await repository.findOne({
      where: { id: data.id },
    });

    if (!languageEntity) throw new Error(WRONG_LANGUAGE_DONT_EXIST);
    if (data.default && !languageEntity.default)
      await this.unsetDefaultLanguage();

    languageEntity.code = data.code;
    languageEntity.default = languageEntity.default || data.default;
    languageEntity.enabled = data.enabled || languageEntity.default;
    const languageEntityUpdated = await repository.save(languageEntity);

    if (!!languageEntityUpdated) {
      await this.historicModel.createPutHistoric(languageEntityUpdated);
      return this.mapLanguageEntity(languageEntityUpdated);
    }

    throw new Error(WRONG_LANGUAGE_PUT);
  }

  async unsetDefaultLanguage() {
    const repository = this.dataSoure.getRepository(LanguageEntity);
    const defaultLanguage = await repository.findOne({
      where: { default: true },
    });

    if (defaultLanguage) {
      defaultLanguage.default = false;
      await repository.save(defaultLanguage);
      await this.historicModel.createPutHistoric(defaultLanguage);
    }
  }

  mapLanguageEntity(language: LanguageEntity) {
    return {
      id: language.id,
      code: language.code,
      default: language.default,
      enabled: language.enabled,
    } as ILanguageModel;
  }
}
