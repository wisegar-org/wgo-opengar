import { DataSource } from 'typeorm';
import { GetConfig } from '@wisegar-org/wgo-settings';
import { ctx } from '../../handlers/AppContextHandler';
import { settingsAdminSeeder, getPop3Settings, getSmtpSettings } from '@wisegar-org/wgo-base-server';
import { SETTINGS_POP3, SETTINGS_SMTP } from '@wisegar-org/wgo-base-models';

export const settingsSeeder = async (dataSource: DataSource) => {
  //Save keys to database settings
  await settingsAdminSeeder({ ...ctx, dataSource }, SETTINGS_POP3, getPop3Settings(GetConfig<any>()));
  await settingsAdminSeeder({ ...ctx, dataSource }, SETTINGS_SMTP, getSmtpSettings(GetConfig<any>()));
};
