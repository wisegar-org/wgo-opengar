import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "@wisegar-org/wgo-settings";

/** Entities */
import { UserEntity } from "./wgo-base/authentication/database/entities/UserEntity";
import { RoleEntity } from "./wgo-base/authentication/database/entities/RoleEntity";
import { LanguageEntity } from "./wgo-base/language/database/entities/LanguageEntity";
import { TranslationEntity } from "./wgo-base/translation/database/entities/TranslationEntity";
import { SettingsEntity } from "./wgo-base/settings/database/entities/SettingsEntity";
import { MediaEntity } from "./wgo-base/storage/database/entities/MediaEntity";
import { StorageEntity } from "./wgo-base/storage/database/entities/StorageEntity";
import { ContactMeEntity } from "./wgo-base/contact/database/entities/ContactMeEntity";
import { CasinaModuleEntity } from "./database/entities/CasinaModuleEntity";

/** Migrations */
import { migrations1651766519693 } from "./wgo-base/authentication/database/migrations/1651766519693-migrations";
import { addRoleEntity1656005738186 } from "./wgo-base/authentication/database/migrations/1656005738186-addRoleEntity";
import { addLanguageEntity1656012423678 } from "./wgo-base/language/database/migrations/1656012423678-addLanguageEntity";
import { addCertificateFields1656434163078 } from "./wgo-base/authentication/database/migrations/1656434163078-addCertificateFields";
import { createTranslationEntity1656439638048 } from "./wgo-base/translation/database/migrations/1656439638048-createTranslationEntity";
import { addSettingsEntity1658164004212 } from "./wgo-base/settings/database/migrations/1658164004212-addSettingsEntity";
import { renameTypeSettings1658240270133 } from "./wgo-base/settings/database/migrations/1658240270133-renameTypeSettings";
import { removeAppSettings1658240565587 } from "./wgo-base/settings/database/migrations/1658240565587-removeAppSettings";
import { fixAdminPassword1658417129112 } from "./wgo-base/authentication/database/migrations/1658417129112-fixAdminPassword";
import { addMediaEntity1658931161380 } from "./wgo-base/storage/database/migrations/1658931161380-addMediaEntity";
import { addStorageEntity1658931419178 } from "./wgo-base/storage/database/migrations/1658931419178-addStorageEntity";
import { addContactMeEntity1658932057343 } from "./wgo-base/contact/database/migrations/1658932057343-addContactMeEntity";
import { addCasinaIndexContentDatabase1659037006696 } from "./database/migrations/1659037006696-addCasinaIndexContentDatabase";

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
    ContactMeEntity,
    CasinaModuleEntity,
  ],
  migrations: [
    migrations1651766519693,
    addRoleEntity1656005738186,
    addLanguageEntity1656012423678,
    addCertificateFields1656434163078,
    createTranslationEntity1656439638048,
    addSettingsEntity1658164004212,
    renameTypeSettings1658240270133,
    removeAppSettings1658240565587,
    fixAdminPassword1658417129112,
    addMediaEntity1658931161380,
    addStorageEntity1658931419178,
    addContactMeEntity1658932057343,
    addCasinaIndexContentDatabase1659037006696,
  ],
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
