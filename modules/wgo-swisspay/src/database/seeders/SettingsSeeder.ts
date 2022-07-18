import { DataSource } from 'typeorm';
import { settingsAdminSeeder } from '../../../../wgo-base/settings/database/seeder/settings';
import { getPop3Settings, getSmtpSettings } from '../../services/SettingsService';

export const settingsSeeder = async (dataSource: DataSource) => {
  //Add keys to settings object
  const settings: { [key: string]: any } = {
    ...getPop3Settings(),
    //   ...getSmtpSettings()
  };

  //Save keys to database settings
  await settingsAdminSeeder(dataSource, settings);
};
