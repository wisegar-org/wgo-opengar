import { DataSource } from 'typeorm';
import { settingsAdminSeeder } from '../../wgo-base/settings/database/seeder/settings';
import { SETTINGS_POP3, SETTINGS_SMTP } from '../../models/Settings/constants';
import { getPop3Settings, getSmtpSettings } from '../../services/SettingsService';

export const settingsSeeder = async (dataSource: DataSource) => {
  //Save keys to database settings
  await settingsAdminSeeder(dataSource, SETTINGS_POP3, getPop3Settings());
  await settingsAdminSeeder(dataSource, SETTINGS_SMTP, getSmtpSettings());
};
