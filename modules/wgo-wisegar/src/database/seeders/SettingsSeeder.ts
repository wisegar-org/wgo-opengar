import { DataSource } from "typeorm";
import { settingsAdminSeeder } from "../../wgo-base/settings/database/seeder/settings";
import {
  SETTINGS_POP3,
  SETTINGS_SMTP,
} from "../../wgo-base/settings/models/constants";
import {
  getPop3Settings,
  getSmtpSettings,
} from "../../wgo-base/settings/models/SettingsUtils";
import { GetConfig } from "@wisegar-org/wgo-settings";

export const settingsSeeder = async (dataSource: DataSource) => {
  //Save keys to database settings
  await settingsAdminSeeder(
    dataSource,
    SETTINGS_POP3,
    getPop3Settings(GetConfig<any>())
  );
  await settingsAdminSeeder(
    dataSource,
    SETTINGS_SMTP,
    getSmtpSettings(GetConfig<any>())
  );
};
