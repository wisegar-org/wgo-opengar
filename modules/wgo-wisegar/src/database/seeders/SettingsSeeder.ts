import { DataSource } from "typeorm";
import { settingsAdminSeeder } from "@wisegar-org/wgo-base-server";
import { SETTINGS_POP3, SETTINGS_SMTP } from "@wisegar-org/wgo-base-models";
import { getPop3Settings, getSmtpSettings } from "@wisegar-org/wgo-base-server";
import { GetConfig } from "@wisegar-org/wgo-settings";
import {
  getFinanceOrganizationSettings,
  SETTINGS_FINANCE_ORGANIZATION,
} from "../../services/Finance/FinanceSettings";
import { ctx } from "../../handlers/AppContextHandler";

export const settingsSeeder = async (dataSource: DataSource) => {
  //Save keys to database settings
  const settings = GetConfig<any>();
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_POP3,
    getPop3Settings(settings)
  );
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_SMTP,
    getSmtpSettings(settings)
  );
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_FINANCE_ORGANIZATION,
    getFinanceOrganizationSettings(settings)
  );
};
