import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "@wisegar-org/wgo-settings";

/** Entities */
import { UserEntity } from "@wisegar-org/wgo-base-server";
import { RoleEntity } from "@wisegar-org/wgo-base-server";
import { LanguageEntity } from "@wisegar-org/wgo-base-server";
import { TranslationEntity } from "@wisegar-org/wgo-base-server";
import { SettingsEntity } from "@wisegar-org/wgo-base-server";
import { MediaEntity } from "@wisegar-org/wgo-base-server";
import { StorageEntity } from "@wisegar-org/wgo-base-server";
import { HistoricEntity } from "@wisegar-org/wgo-base-server";
import { ContactMeEntity } from "@wisegar-org/wgo-base-server";
import { CasinaModuleEntity } from "./database/entities/CasinaModuleEntity";

/** Migrations */
import { getAuthenticationMigrations } from "@wisegar-org/wgo-base-server";
import { getContactMigrations } from "@wisegar-org/wgo-base-server";
import { getHistoricMigrations } from "@wisegar-org/wgo-base-server";
import { getLanguageMigrations } from "@wisegar-org/wgo-base-server";
import { getSettingsMigrations } from "@wisegar-org/wgo-base-server";
import { getStorageMigrations } from "@wisegar-org/wgo-base-server";
import { getTemplateMigrations } from "@wisegar-org/wgo-base-server";
import { getTranslationMigrations } from "@wisegar-org/wgo-base-server";
import { getCasinaMigrations } from "./database/migrations";

const migrations = getAuthenticationMigrations()
  .concat(getContactMigrations())
  .concat(getHistoricMigrations())
  .concat(getLanguageMigrations())
  .concat(getSettingsMigrations())
  .concat(getStorageMigrations())
  .concat(getTemplateMigrations())
  .concat(getTranslationMigrations())
  .concat(getCasinaMigrations());

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: GetDBHostKey() || "localhost",
  port: parseInt(`${GetDBPortKey() || 5432}`),
  username: GetDBUserNameKey() || "postgres",
  password: GetDBPasswordKey() || "postgres",
  database: GetDBNameKey() || "wgo-swisspay",
  useUTC: true,
  migrationsRun: true,
  entities: [
    UserEntity,
    RoleEntity,
    LanguageEntity,
    TranslationEntity,
    SettingsEntity,
    MediaEntity,
    StorageEntity,
    HistoricEntity,
    ContactMeEntity,
    CasinaModuleEntity,
  ],
  migrations: migrations,
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
