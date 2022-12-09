import { DataSource } from "typeorm";
import { settingsAdminSeeder } from "@wisegar-org/wgo-base-server/build/settings/database/seeder/settings";
import {
  getPop3Settings,
  getSmtpSettings,
} from "@wisegar-org/wgo-base-server/build/settings/models/SettingsUtils";
import { GetConfig } from "@wisegar-org/wgo-settings";
import {
  SETTINGS_POP3,
  SETTINGS_SMTP,
} from "@wisegar-org/wgo-base-models/build/settings/constants";

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
