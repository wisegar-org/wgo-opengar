import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "@wisegar-org/wgo-settings";

/** Entities */
import { UserEntity } from "@wisegar-org/wgo-base-server/build/authentication/database/entities/UserEntity";
import { RoleEntity } from "@wisegar-org/wgo-base-server/build/authentication/database/entities/RoleEntity";
import { LanguageEntity } from "@wisegar-org/wgo-base-server/build/language/database/entities/LanguageEntity";
import { TranslationEntity } from "@wisegar-org/wgo-base-server/build/translation/database/entities/TranslationEntity";
import { SettingsEntity } from "@wisegar-org/wgo-base-server/build/settings/database/entities/SettingsEntity";
import { ContactMeEntity } from "@wisegar-org/wgo-base-server/build/contact/database/entities/ContactMeEntity";
import { HistoricEntity } from "@wisegar-org/wgo-base-server/build/historic/database/entities/HistoricEntity";
import { TemplateEntity } from "@wisegar-org/wgo-base-server/build/template/database/entities/TemplateEntity";
import { MediaEntity } from "@wisegar-org/wgo-base-server/build/storage/database/entities/MediaEntity";
import { StorageEntity } from "@wisegar-org/wgo-base-server/build/storage/database/entities/StorageEntity";

import { AGVEventEntity } from "./database/entities/AGVEventEntity";
import { AGVInscriptionEntity } from "./database/entities/AGVInscriptionEntity";
import { AGVPollEntity } from "./database/entities/AGVPollEntity";
import { AGVNewsletterInscriptionEntity } from "./database/entities/AGVNewsletterInscriptionEntity";
import { AGVNewsletterMessageEntity } from "./database/entities/AGVNewsletterMessageEntity";

/** Migrations */
import { getAuthenticationMigrations } from "@wisegar-org/wgo-base-server/build/authentication/database/migrations";
import { getContactMigrations } from "@wisegar-org/wgo-base-server/build/contact/database/migrations";
import { getHistoricMigrations } from "@wisegar-org/wgo-base-server/build/historic/database/migrations";
import { getLanguageMigrations } from "@wisegar-org/wgo-base-server/build/language/database/migrations";
import { getSettingsMigrations } from "@wisegar-org/wgo-base-server/build/settings/database/migrations";
import { getStorageMigrations } from "@wisegar-org/wgo-base-server/build/storage/database/migrations";
import { getTemplateMigrations } from "@wisegar-org/wgo-base-server/build/template/database/migrations";
import { getTranslationMigrations } from "@wisegar-org/wgo-base-server/build/translation/database/migrations";
import { getAgvMigrations } from "./database/migrations";

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
  entities: [
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
  ],
  migrations: migrations,
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
