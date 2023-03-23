import { DataSource, DataSourceOptions } from 'typeorm';
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from '@wisegar-org/wgo-settings';

import {
  UserEntity,
  RoleEntity,
  MediaEntity,
  LanguageEntity,
  TranslationEntity,
  SettingsEntity,
  HistoricEntity,
  getAuthenticationMigrations,
  getContactMigrations,
  getHistoricMigrations,
  getLanguageMigrations,
  getSettingsMigrations,
  getStorageMigrations,
  getTemplateMigrations,
  getTranslationMigrations,
} from '@wisegar-org/wgo-base-server';

/** Entities */
import { EmailMediaEntity } from './database/entities/EmailMediaEntity';
import { EmailHistoryEntity } from './database/entities/EmailHistoryEntity';
import { EmployeesEntity } from './database/entities/EmployeesEntity';

/** Migrations */
import { getSwisspayMigrations } from './database/migrations';

const migrations = getAuthenticationMigrations()
  .concat(getContactMigrations())
  .concat(getHistoricMigrations())
  .concat(getLanguageMigrations())
  .concat(getSettingsMigrations())
  .concat(getStorageMigrations())
  .concat(getTemplateMigrations())
  .concat(getTranslationMigrations())
  .concat(getSwisspayMigrations());

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: GetDBHostKey() || 'localhost',
  port: parseInt(`${GetDBPortKey() || 5432}`),
  username: GetDBUserNameKey() || 'postgres',
  password: GetDBPasswordKey() || 'postgres',
  database: GetDBNameKey() || 'wgo-swisspay',
  useUTC: true,
  migrationsRun: true,
  entities: [
    UserEntity,
    RoleEntity,
    MediaEntity,
    LanguageEntity,
    TranslationEntity,
    SettingsEntity,
    HistoricEntity,
    EmailMediaEntity,
    EmailHistoryEntity,
    EmployeesEntity,
  ],
  migrations: migrations,
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
