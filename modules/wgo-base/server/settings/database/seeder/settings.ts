import { DataSource } from "typeorm";
import SettingsEntity from "../entities/SettingsEntity";
import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";
import { SettingsModel } from "../../models/SettingsModel";
import {
  ISettingValueBoolean,
  ISettingValuePassword,
} from "../../../../models/settings";

export const settingsAdminSeeder = async (
  dataSource: DataSource,
  type: string,
  settings: any = {}
) => {
  const settingsModel = new SettingsModel({ dataSource: dataSource } as any);
  const settingsResult = await settingsModel.getSettingsEntity(type);

  if (IsNullOrUndefined(settingsResult)) {
    const settingsEntity = new SettingsEntity();
    settingsEntity.type_settings = type;
    settingsEntity.settings = {};
    Object.keys(settings).map((key) => {
      settingsEntity.settings[key] = settingsModel.getSettingsValueParse({
        key,
        value: settings[key],
      });
    });
    const settingsEntityResult = await settingsModel.saveSettingsEntity(
      settingsEntity
    );
    if (!IsNullOrUndefined(settingsEntityResult)) {
      console.debug(
        `Admin Settings registered: ${settingsEntityResult.type_settings}`
      );
    }
  } else if (!!settingsResult) {
    Object.keys(settingsResult.settings).map((key) => {
      if (
        typeof settingsResult.settings[key] === "string" ||
        typeof settingsResult.settings[key] === "number"
      )
        settingsResult.settings[key] = settingsModel.getSettingsValueParse({
          key,
          value: settingsResult.settings[key],
        });
    });
    Object.keys(settings).map((key) => {
      if (IsNullOrUndefined(settingsResult.settings[key])) {
        settingsResult.settings[key] = settingsModel.getSettingsValueParse({
          key,
          value: settings[key],
        });
      } else if (typeof settings[key] !== "string") {
        let value = null;
        if (
          (settings[key] as any).type === "boolean" &&
          (settingsResult.settings[key] as any).type !== "boolean"
        ) {
          value = settings[key] as ISettingValueBoolean;
          value.value = !!settingsResult.settings[key].value;
        }
        if (
          (settings[key] as any).type === "password" &&
          (settingsResult.settings[key] as any).type !== "password"
        ) {
          value = settings[key] as ISettingValuePassword;
          value.value = settingsResult.settings[key].value;
        }
        if (
          (settings[key] as any).type === "number" &&
          (settingsResult.settings[key] as any).type !== "number"
        ) {
          value = settings[key] as ISettingValuePassword;
          value.value = settingsResult.settings[key].value;
        }
        if (value) {
          settingsResult.settings[key] = value;
        }
      }
    });

    const settingsEntityResult = await settingsModel.saveSettingsEntity(
      settingsResult
    );
    if (!IsNullOrUndefined(settingsEntityResult)) {
      console.debug(
        `Admin Settings updated: ${settingsEntityResult.type_settings}`
      );
    }
  }
};
