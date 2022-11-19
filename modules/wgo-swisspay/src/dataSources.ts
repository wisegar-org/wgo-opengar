import { DataSource, DataSourceOptions } from 'typeorm';
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from '@wisegar-org/wgo-settings';

/** Entities */
import { UserEntity } from './wgo-base/authentication/database/entities/UserEntity';
import { RoleEntity } from './wgo-base/authentication/database/entities/RoleEntity';
import { LanguageEntity } from './wgo-base/language/database/entities/LanguageEntity';
import { TranslationEntity } from './wgo-base/translation/database/entities/TranslationEntity';
import { SettingsEntity } from './wgo-base/settings/database/entities/SettingsEntity';
import { EmailMediaEntity } from './database/entities/EmailMediaEntity';
import { EmailHistoryEntity } from './database/entities/EmailHistoryEntity';
import { EmployeesEntity } from './database/entities/EmployeesEntity';

/** Migrations */
import { getAuthenticationMigrations } from './wgo-base/authentication/database/migrations';
import { getContactMigrations } from './wgo-base/contact/database/migrations';
import { getHistoricMigrations } from './wgo-base/historic/database/migrations';
import { getLanguageMigrations } from './wgo-base/language/database/migrations';
import { getSettingsMigrations } from './wgo-base/settings/database/migrations';
import { getStorageMigrations } from './wgo-base/storage/database/migrations';
import { getTemplateMigrations } from './wgo-base/template/database/migrations';
import { getTranslationMigrations } from './wgo-base/translation/database/migrations';
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
    LanguageEntity,
    TranslationEntity,
    SettingsEntity,
    EmailMediaEntity,
    EmailHistoryEntity,
    EmployeesEntity,
  ],
  migrations: migrations,
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
