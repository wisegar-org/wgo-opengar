import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "@wisegar-org/wgo-settings";

/********************************* Entities **********************************/
/** Base Entities */
import { UserEntity } from "./wgo-base/authentication/database/entities/UserEntity";
import { RoleEntity } from "./wgo-base/authentication/database/entities/RoleEntity";
import { LanguageEntity } from "./wgo-base/language/database/entities/LanguageEntity";
import { TranslationEntity } from "./wgo-base/translation/database/entities/TranslationEntity";
import { SettingsEntity } from "./wgo-base/settings/database/entities/SettingsEntity";
import { ContactMeEntity } from "./wgo-base/contact/database/entities/ContactMeEntity";
import { MediaEntity } from "./wgo-base/storage/database/entities/MediaEntity";
import { StorageEntity } from "./wgo-base/storage/database/entities/StorageEntity";

/** Wisegar Module Entities */
import { IndexContentEntity } from "./database/entities/IndexContentEntity";

/** Wisegar Github submodule entities */
import { AccountEntity } from "./database/entities/Finance/AccountEntity";
import { CollaboratorEntity } from "./database/entities/Finance/CollaboratorEntity";
import { IssueEntity } from "./database/entities/Finance/IssueEntity";
import { LabelEntity } from "./database/entities/Finance/LabelEntity";
import { ProjectEntity } from "./database/entities/Finance/ProjectEntity";
import { RepositoryEntity } from "./database/entities/Finance/RepositoryEntity";

/********************************* Migrations **********************************/
import { getAuthenticationMigrations } from "./wgo-base/authentication/database/migrations";
import { getContactMigrations } from "./wgo-base/contact/database/migrations";
import { getHistoricMigrations } from "./wgo-base/historic/database/migrations";
import { getLanguageMigrations } from "./wgo-base/language/database/migrations";
import { getSettingsMigrations } from "./wgo-base/settings/database/migrations";
import { getStorageMigrations } from "./wgo-base/storage/database/migrations";
import { getTemplateMigrations } from "./wgo-base/template/database/migrations";
import { getTranslationMigrations } from "./wgo-base/translation/database/migrations";
import { getWisegarMigrations } from "./database/migrations";

const migrations = getAuthenticationMigrations()
  .concat(getContactMigrations())
  .concat(getHistoricMigrations())
  .concat(getLanguageMigrations())
  .concat(getSettingsMigrations())
  .concat(getStorageMigrations())
  .concat(getTemplateMigrations())
  .concat(getTranslationMigrations())
  .concat(getWisegarMigrations());

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
    ContactMeEntity,
    MediaEntity,
    IndexContentEntity,
    StorageEntity,
    IssueEntity,
    CollaboratorEntity,
    LabelEntity,
    ProjectEntity,
    RepositoryEntity,
    AccountEntity,
  ],
  migrations: migrations,
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
