import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";
import { DataSource } from "typeorm";
import {
  IGetSettingsParam,
  ISetSettingsParam,
  ISettingModelValue,
  ISettingsModel,
  ISettingValueBoolean,
  ISettingValueNumber,
  ISettingValuePassword,
  ISettingValueString,
} from "./index";
import { IContextBase } from "../../core/models/context";
import SettingsEntity from "../database/entities/SettingsEntity";
import {
  APP_SETTINGS,
  POP3_EVENT_LOOP,
  POP3_EVENT_LOOP_KEYS,
  WRONG_TYPE,
} from "./constants";
import { cypherData, decypherData } from "@wisegar-org/wgo-crypto";
import { EventEmitter } from "events";
import { listenersEvents } from "./SettingsUtils";

export class SettingsModel {
  private dataSource: DataSource;
  private ctx: IContextBase;
  private emiter: EventEmitter;

  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.dataSource = ctx.dataSource;
    this.emiter = ctx.emiter;
  }

  public async getSettingsEntity(
    type_settings: string
  ): Promise<SettingsEntity | null> {
    const repo = await this.dataSource.getRepository(SettingsEntity);
    const settings = await repo.findOne({
      where: { type_settings: type_settings || APP_SETTINGS },
    });
    return settings;
  }

  public async saveSettingsEntity(entity: SettingsEntity) {
    const repo = await this.dataSource.getRepository(SettingsEntity);
    return await repo.save(entity);
  }

  public async getSettingsObject(data?: IGetSettingsParam): Promise<any> {
    const settings = await this.getSettingsEntity(
      data?.type_settings || APP_SETTINGS
    );
    if (!settings) throw new Error(WRONG_TYPE);

    return this.getSettingValueObject(settings?.settings || {});
  }

  public async getSettingsList(
    data?: IGetSettingsParam
  ): Promise<ISettingsModel[]> {
    const settings = await this.getSettingsEntity(
      data?.type_settings || APP_SETTINGS
    );
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
    const settingsResult = await this.getSettingsEntity(
      data?.type_settings || APP_SETTINGS
    );

    const value = this.getSettingsValueParse(data);

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

    listenersEvents.forEach((listner) => {
      if (listner.keyListeners.indexOf(data.key) !== -1) {
        this.emiter.emit(listner.event, value.value);
      }
    });

    return true;
  }

  public getSettingsValueParse(data: ISetSettingsParam) {
    if (typeof data.value === "string") {
      const value = this.getSettingPasswordValue(data.value);
      if (data.key.toLowerCase().indexOf("password") !== -1) {
        return <ISettingValuePassword>{
          type: "password",
          value: this.getSettingPassword(data.key, value),
        };
      } else {
        return <ISettingValueString>{
          type: "string",
          value: value,
        };
      }
    } else if (typeof data.value === "number") {
      return <ISettingValueNumber>{
        type: "number",
        value: data.value,
      };
    } else {
      if (data.value.type === "password") {
        const value = this.getSettingPasswordValue(data.value.value);
        return <ISettingValuePassword>{
          type: "password",
          value: this.getSettingPassword(data.key, value),
        };
      } else if (data.value.type === "boolean") {
        return <ISettingValueBoolean>{
          type: "boolean",
          value: this.getSettingBoolean(data.value.value),
        };
      } else if (data.value.type === "number") {
        return <ISettingValueNumber>{
          type: "number",
          value: parseFloat(`${data.value.value}`),
        };
      }

      return data.value;
    }
  }

  mapSettingsEntity(setting: SettingsEntity) {
    return Object.keys(setting.settings).map((key) => {
      const value = this.getSettingsValueParse({
        key,
        value: setting.settings[key],
      });
      return {
        key: key,
        value: this.getSettingValue(key, value),
        type_settings: setting.type_settings,
      };
    }) as ISettingsModel[];
  }

  getSettingValue(key: string, value: ISettingModelValue) {
    if (
      (!value || typeof value === "string") &&
      key.toLowerCase().indexOf("password") !== -1
    ) {
      return { type: "password", value: !!value ? "" : null };
    } else if (typeof value !== "string" && value.type === "password") {
      return { type: "password", value: !!value.value ? "" : null };
    }
    return value;
  }

  getSettingValueObject(settings: any) {
    const result: any = {};
    Object.keys(settings).forEach((key) => {
      const value = this.getSettingsValueParse({ key, value: settings[key] });
      result[key] = value.value;
    });
    return result;
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

  getSettingBoolean(value: any) {
    return `${value}` === "true";
  }
}
