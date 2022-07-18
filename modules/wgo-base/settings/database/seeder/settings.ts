import { DataSource } from "typeorm";
import { APP_SETTINGS } from "../../models/constants";
import SettingsEntity from "../entities/SettingsEntity";
import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";

export const settingsAdminSeeder = async (
  dataSource: DataSource,
  settings: any = {}
) => {
  const settingsRepository = dataSource.getRepository(SettingsEntity);
  const settingsResult = await settingsRepository.findOne({
    where: {
      type: APP_SETTINGS,
    },
  });

  if (IsNullOrUndefined(settingsResult)) {
    const settingsEntity = new SettingsEntity();
    settingsEntity.type = APP_SETTINGS;
    settingsEntity.settings = settings;
    const settingsEntityResult = await settingsRepository.save(settingsEntity);
    if (!IsNullOrUndefined(settingsEntityResult)) {
      console.debug(`Admin Settings registered: ${settingsEntityResult.type}`);
    }
  } else if (!!settingsResult) {
    Object.keys(settings).map((key) => {
      if (IsNullOrUndefined(settingsResult.settings[key])) {
        settingsResult.settings[key] = settings[key];
      }
    });

    const settingsEntityResult = await settingsRepository.save(settingsResult);
    if (!IsNullOrUndefined(settingsEntityResult)) {
      console.debug(`Admin Settings updated: ${settingsEntityResult.type}`);
    }
  }
};
