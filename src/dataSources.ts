import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "wgo-settings";

import {
  UserEntity,
  RoleEntity,
  LanguageEntity,
  TranslationEntity,
  SettingsEntity,
  ContactMeEntity,
  HistoricEntity,
  TemplateEntity,
  MediaEntity,
  StorageEntity,
  getAuthenticationMigrations,
  getContactMigrations,
  getHistoricMigrations,
  getLanguageMigrations,
  getSettingsMigrations,
  getStorageMigrations,
  getTemplateMigrations,
  getTranslationMigrations,
} from "@wisegar-org/wgo-base-server";

import { getAgvMigrations } from "../modules/database/migrations";
import AGVEventEntity from "../modules/database/entities/AGVEventEntity";
import { AGVInscriptionEntity } from "../modules/database/entities/AGVInscriptionEntity";
import AGVPollEntity from "../modules/database/entities/AGVPollEntity";
import { AGVNewsletterInscriptionEntity } from "../modules/database/entities/AGVNewsletterInscriptionEntity";
import { AGVNewsletterMessageEntity } from "../modules/database/entities/AGVNewsletterMessageEntity";

/** Entities */
const entities = [
  UserEntity,
  RoleEntity,
  LanguageEntity,
  TranslationEntity,
  SettingsEntity,
  ContactMeEntity,
  HistoricEntity,
  TemplateEntity,
  MediaEntity,
  StorageEntity,
  AGVEventEntity,
  AGVInscriptionEntity,
  AGVPollEntity,
  AGVNewsletterInscriptionEntity,
  AGVNewsletterMessageEntity,
];

/** Migrations */
const migrations = getAuthenticationMigrations()
  .concat(getContactMigrations())
  .concat(getHistoricMigrations())
  .concat(getLanguageMigrations())
  .concat(getSettingsMigrations())
  .concat(getStorageMigrations())
  .concat(getTemplateMigrations())
  .concat(getTranslationMigrations())
  .concat(getAgvMigrations());

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: GetDBHostKey() || "localhost",
  port: parseInt(`${GetDBPortKey() || 5432}`),
  username: GetDBUserNameKey() || "postgres",
  password: GetDBPasswordKey() || "postgres",
  database: GetDBNameKey() || "wgo-template",
  useUTC: true,
  migrationsRun: true,
  entities: entities,
  migrations: migrations,
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
