import { DataSource, DataSourceOptions } from 'typeorm';

/** Entities */
import { UserEntity } from '../wgo-base/authentication/database/entities/UserEntity';
import { RoleEntity } from '../wgo-base/authentication/database/entities/RoleEntity';
import { LanguageEntity } from '../wgo-base/language/database/entities/LanguageEntity';
import { TranslationEntity } from '../wgo-base/translation/database/entities/TranslationEntity';
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

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'wgo-swisspay',
  useUTC: true,
  migrationsRun: true,
  entities: [
    UserEntity,
    RoleEntity,
    LanguageEntity,
    TranslationEntity,
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
  ],
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
