import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";
import { DataSource } from "typeorm";
import { IGetSettingsParam, ISetSettingsParam, ISettingsModel } from ".";
import { IContextBase } from "../../core/models/context";
import SettingsEntity from "../database/entities/SettingsEntity";
import { APP_SETTINGS, WRONG_TYPE } from "./constants";
import { cypherData, decypherData } from "@wisegar-org/wgo-crypto";

export class SettingsModel {
  private dataSource: DataSource;
  private ctx: IContextBase;

  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.dataSource = ctx.dataSource;
  }

  public async getSettingsObject(data?: IGetSettingsParam): Promise<any> {
    const repo = await this.dataSource.getRepository(SettingsEntity);
    const settings = await repo.findOne({
      where: { type_settings: data?.type_settings || APP_SETTINGS },
    });
    if (!settings) throw new Error(WRONG_TYPE);

    return settings?.settings || {};
  }

  public async getSettingsList(
    data?: IGetSettingsParam
  ): Promise<ISettingsModel[]> {
    const repo = await this.dataSource.getRepository(SettingsEntity);
    const settings = await repo.findOne({
      where: { type_settings: data?.type_settings || APP_SETTINGS },
    });
    if (!settings) throw new Error(WRONG_TYPE);

    return this.mapSettingsEntity(settings);
  }

  public async getAllSettingsList(): Promise<ISettingsModel[]> {
    const repo = await this.dataSource.getRepository(SettingsEntity);
    const settings = await repo.find({
      order: {
        type_settings: "ASC",
      },
    });

    let result: ISettingsModel[] = [];
    settings.forEach((setting) => {
      result = result.concat(this.mapSettingsEntity(setting));
    });
    return result;
  }

  public async setSettings(data: ISetSettingsParam) {
    const settingsRepository = this.dataSource.getRepository(SettingsEntity);
    const settingsResult = await settingsRepository.findOne({
      where: {
        type_settings: data.type_settings || APP_SETTINGS,
      },
    });

    const value =
      data.key.toLowerCase().indexOf("password") !== -1
        ? this.getSettingPassword(data.key, data.value)
        : data.value;

    if (IsNullOrUndefined(settingsResult)) {
      const settingsEntity = new SettingsEntity();
      settingsEntity.type_settings = data.type_settings || APP_SETTINGS;
      settingsEntity.settings = { [data.key]: value };
      const settingsEntityResult = await settingsRepository.save(
        settingsEntity
      );
    } else if (!!settingsResult) {
      settingsResult.settings[data.key] = value;
      const settingsEntityResult = await settingsRepository.save(
        settingsResult
      );
    }

    return true;
  }

  mapSettingsEntity(setting: SettingsEntity) {
    return Object.keys(setting.settings).map((key) => ({
      key: key,
      value: this.getSettingValue(key, setting.settings[key]),
      type_settings: setting.type_settings,
    })) as ISettingsModel[];
  }

  getSettingValue(key: string, value: string) {
    if (key.toLowerCase().indexOf("password") !== -1) {
      return "";
    }
    return value;
  }

  getSettingPasswordValue(value: string) {
    try {
      const data = decypherData(value);
      return (data as any).value;
    } catch (err) {
      return value;
    }
  }

  getSettingPassword(key: string, value: string) {
    return cypherData({
      key,
      value,
    });
  }
}
