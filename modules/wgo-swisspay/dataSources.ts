import { DataSource, DataSourceOptions } from 'typeorm';
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from '@wisegar-org/wgo-settings';

/** Entities */
import { UserEntity } from '../wgo-base/authentication/database/entities/UserEntity';
import { RoleEntity } from '../wgo-base/authentication/database/entities/RoleEntity';
import { LanguageEntity } from '../wgo-base/language/database/entities/LanguageEntity';
import { TranslationEntity } from '../wgo-base/translation/database/entities/TranslationEntity';
import { SettingsEntity } from '../wgo-base/settings/database/entities/SettingsEntity';
import { EmailMediaEntity } from './src/database/entities/EmailMediaEntity';
import { EmailHistoryEntity } from './src/database/entities/EmailHistoryEntity';
import { EmployeesEntity } from './src/database/entities/EmployeesEntity';

/** Migrations */
import { migrations1651766519693 } from '../wgo-base/authentication/database/migrations/1651766519693-migrations';
import { createEmailMedia1651972762300 } from './src/database/migrations/1651972762300-createEmailMedia';
import { createEmailHistory1651974663732 } from './src/database/migrations/1651974663732-createEmailHistory';
import { createEmailMediaRelation1651975332815 } from './src/database/migrations/1651975332815-createEmailMediaRelation';
import { removeUniqueContentID1655304993610 } from './src/database/migrations/1655304993610-removeUniqueContentID';
import { addRoleEntity1656005738186 } from '../wgo-base/authentication/database/migrations/1656005738186-addRoleEntity';
import { addLanguageEntity1656012423678 } from '../wgo-base/language/database/migrations/1656012423678-addLanguageEntity';
import { addCertificateFields1656434163078 } from '../wgo-base/authentication/database/migrations/1656434163078-addCertificateFields';
import { createTranslationEntity1656439638048 } from '../wgo-base/translation/database/migrations/1656439638048-createTranslationEntity';
import { createEmployees1657550848007 } from './src/database/migrations/1657550848007-createEmployees';
import { updateEmployees1657747113758 } from './src/database/migrations/1657747113758-updateEmployees';
import { addSettingsEntity1658164004212 } from '../wgo-base/settings/database/migrations/1658164004212-addSettingsEntity';
import { renameTypeSettings1658240270133 } from '../wgo-base/settings/database/migrations/1658240270133-renameTypeSettings';
import { removeAppSettings1658240565587 } from '../wgo-base/settings/database/migrations/1658240565587-removeAppSettings';
import { fixAdminPassword1658417129112 } from '../wgo-base/authentication/database/migrations/1658417129112-fixAdminPassword';

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
  migrations: [
    migrations1651766519693,
    createEmailMedia1651972762300,
    createEmailHistory1651974663732,
    createEmailMediaRelation1651975332815,
    removeUniqueContentID1655304993610,
    addRoleEntity1656005738186,
    addLanguageEntity1656012423678,
    addCertificateFields1656434163078,
    createTranslationEntity1656439638048,
    createEmployees1657550848007,
    updateEmployees1657747113758,
    addSettingsEntity1658164004212,
    renameTypeSettings1658240270133,
    removeAppSettings1658240565587,
    fixAdminPassword1658417129112,
  ],
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
