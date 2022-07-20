import { DataSource } from "typeorm";
import { APP_SETTINGS } from "../../models/constants";
import SettingsEntity from "../entities/SettingsEntity";
import {
  IsNullOrUndefined,
  IsStringEmptyNullOrUndefined,
} from "@wisegar-org/wgo-object-extensions";

export const settingsAdminSeeder = async (
  dataSource: DataSource,
  type: string,
  settings: any = {}
) => {
  const settingsRepository = dataSource.getRepository(SettingsEntity);
  const settingsResult = await settingsRepository.findOne({
    where: {
      type_settings: type,
    },
  });

  if (IsNullOrUndefined(settingsResult)) {
    const settingsEntity = new SettingsEntity();
    settingsEntity.type_settings = type;
    settingsEntity.settings = settings;
    const settingsEntityResult = await settingsRepository.save(settingsEntity);
    if (!IsNullOrUndefined(settingsEntityResult)) {
      console.debug(
        `Admin Settings registered: ${settingsEntityResult.type_settings}`
      );
    }
  } else if (!!settingsResult) {
    Object.keys(settings).map((key) => {
      if (IsNullOrUndefined(settingsResult.settings[key])) {
        settingsResult.settings[key] = !IsStringEmptyNullOrUndefined(
          settings[key]
        )
          ? settings[key]
          : "";
      }
    });

    const settingsEntityResult = await settingsRepository.save(settingsResult);
    if (!IsNullOrUndefined(settingsEntityResult)) {
      console.debug(
        `Admin Settings updated: ${settingsEntityResult.type_settings}`
      );
    }
  }
};
