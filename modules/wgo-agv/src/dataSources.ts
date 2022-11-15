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
import { ContactMeEntity } from "./wgo-base/contact/database/entities/ContactMeEntity";
import { HistoricEntity } from "./wgo-base/historic/database/entities/HistoricEntity";
import { TemplateEntity } from "./wgo-base/template/database/entities/TemplateEntity";
import { MediaEntity } from "./wgo-base/storage/database/entities/MediaEntity";
import { StorageEntity } from "./wgo-base/storage/database/entities/StorageEntity";

import { AGVEventEntity } from "./database/entities/AGVEventEntity";
import { AGVInscriptionEntity } from "./database/entities/AGVInscriptionEntity";
import { AGVPollEntity } from "./database/entities/AGVPollEntity";
import { AGVNewsletterInscriptionEntity } from "./database/entities/AGVNewsletterInscriptionEntity";
import { AGVNewsletterMessageEntity } from "./database/entities/AGVNewsletterMessageEntity";

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
import { addContactMeEntity1658932057343 } from "./wgo-base/contact/database/migrations/1658932057343-addContactMeEntity";
import { addUniqueUserProps1661872515554 } from "./wgo-base/authentication/database/migrations/1661872515554-addUniqueUserProps";
import { addUniqueCodeProp1662052264312 } from "./wgo-base/authentication/database/migrations/1662052264312-addUniqueCodeProp";
import { createHistoricTable1668532176196 } from "./wgo-base/historic/database/migrations/1668532176196-createHistoricTable";
import { createTemplateTable1668532715433 } from "./wgo-base/template/database/migrations/1668532715433-createTemplateTable";
import { addMediaEntity1658931161380 } from "./wgo-base/storage/database/migrations/1658931161380-addMediaEntity";
import { createEventTable1668534412569 } from "./database/migrations/1668534412569-createEventTable";
import { createInscriptionTable1668535321834 } from "./database/migrations/1668535321834-createInscriptionTable";
import { createPollTable1668539264505 } from "./database/migrations/1668539264505-createPollTable";
import { createNewsletterInscriptionTable1668539471828 } from "./database/migrations/1668539471828-createNewsletterInscriptionTable";
import { createNewsletterMessageTable1668539669907 } from "./database/migrations/1668539669907-createNewsletterMessageTable";
import { addStorageEntity1658931419178 } from "./wgo-base/storage/database/migrations/1658931419178-addStorageEntity";
import { addStorageHistory1668542155507 } from "./wgo-base/storage/database/migrations/1668542155507-addStorageHistory";
import { addMediaHistory1668545019180 } from "./wgo-base/storage/database/migrations/1668545019180-addMediaHistory";
import { addAuthHistoric1668548748218 } from "./wgo-base/authentication/database/migrations/1668548748218-addAuthHistoric";
import { addContactMeHistoric1668549723950 } from "./wgo-base/contact/database/migrations/1668549723950-addContactMeHistoric";
import { changeDateType1668550334970 } from "./database/migrations/1668550334970-changeDateType";
import { addLanguageHistoric1668550415911 } from "./wgo-base/language/database/migrations/1668550415911-addLanguageHistoric";
import { addSettingHistoric1668553325149 } from "./wgo-base/settings/database/migrations/1668553325149-addSettingHistoric";
import { addTemplateHistoric1668553582516 } from "./wgo-base/template/database/migrations/1668553582516-addTemplateHistoric";
import { addTranslationHistoric1668554264770 } from "./wgo-base/translation/database/migrations/1668554264770-addTranslationHistoric";

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
    addContactMeEntity1658932057343,
    addUniqueUserProps1661872515554,
    addUniqueCodeProp1662052264312,
    createHistoricTable1668532176196,
    createTemplateTable1668532715433,
    addMediaEntity1658931161380,
    createEventTable1668534412569,
    createInscriptionTable1668535321834,
    createPollTable1668539264505,
    createNewsletterInscriptionTable1668539471828,
    createNewsletterMessageTable1668539669907,
    addStorageEntity1658931419178,
    addStorageHistory1668542155507,
    addMediaHistory1668545019180,
    addAuthHistoric1668548748218,
    addContactMeHistoric1668549723950,
    changeDateType1668550334970,
    addLanguageHistoric1668550415911,
    addSettingHistoric1668553325149,
    addTemplateHistoric1668553582516,
    addTranslationHistoric1668554264770,
  ],
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
