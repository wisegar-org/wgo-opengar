import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "@wisegar-org/wgo-settings";

/** Entities */
import { UserEntity } from "./wgo-base/server/authentication/database/entities/UserEntity";
import { RoleEntity } from "./wgo-base/server/authentication/database/entities/RoleEntity";
import { LanguageEntity } from "./wgo-base/server/language/database/entities/LanguageEntity";
import { TranslationEntity } from "./wgo-base/server/translation/database/entities/TranslationEntity";
import { SettingsEntity } from "./wgo-base/server/settings/database/entities/SettingsEntity";
import { ContactMeEntity } from "./wgo-base/server/contact/database/entities/ContactMeEntity";
import { HistoricEntity } from "./wgo-base/server/historic/database/entities/HistoricEntity";
import { TemplateEntity } from "./wgo-base/server/template/database/entities/TemplateEntity";
import { MediaEntity } from "./wgo-base/server/storage/database/entities/MediaEntity";
import { StorageEntity } from "./wgo-base/server/storage/database/entities/StorageEntity";

import { AGVEventEntity } from "./database/entities/AGVEventEntity";
import { AGVInscriptionEntity } from "./database/entities/AGVInscriptionEntity";
import { AGVPollEntity } from "./database/entities/AGVPollEntity";
import { AGVNewsletterInscriptionEntity } from "./database/entities/AGVNewsletterInscriptionEntity";
import { AGVNewsletterMessageEntity } from "./database/entities/AGVNewsletterMessageEntity";

/** Migrations */
import { getAuthenticationMigrations } from "./wgo-base/server/authentication/database/migrations";
import { getContactMigrations } from "./wgo-base/server/contact/database/migrations";
import { getHistoricMigrations } from "./wgo-base/server/historic/database/migrations";
import { getLanguageMigrations } from "./wgo-base/server/language/database/migrations";
import { getSettingsMigrations } from "./wgo-base/server/settings/database/migrations";
import { getStorageMigrations } from "./wgo-base/server/storage/database/migrations";
import { getTemplateMigrations } from "./wgo-base/server/template/database/migrations";
import { getTranslationMigrations } from "./wgo-base/server/translation/database/migrations";
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
