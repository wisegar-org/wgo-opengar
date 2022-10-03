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
import {
  getFinanceOrganizationSettings,
  SETTINGS_FINANCE_ORGANIZATION,
} from "../../services/Finance/FInanceSettings";

export const settingsSeeder = async (dataSource: DataSource) => {
  //Save keys to database settings
  const settings = GetConfig<any>();
  await settingsAdminSeeder(
    dataSource,
    SETTINGS_POP3,
    getPop3Settings(settings)
  );
  await settingsAdminSeeder(
    dataSource,
    SETTINGS_SMTP,
    getSmtpSettings(settings)
  );
  await settingsAdminSeeder(
    dataSource,
    SETTINGS_FINANCE_ORGANIZATION,
    getFinanceOrganizationSettings(settings)
  );
};
