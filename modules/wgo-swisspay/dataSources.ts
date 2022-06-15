import { DataSource, DataSourceOptions } from "typeorm";

/** Entities */
import { UserEntity } from "../wgo-base/authenticacion/database/entities/UserEntity";
import { EmailMediaEntity } from "./src/database/entities/EmailMediaEntity";
import { EmailHistoryEntity } from "./src/database/entities/EmailHistoryEntity";

/** Migrations */
import { migrations1651766519693 } from "../wgo-base/authenticacion/database/migrations/1651766519693-migrations";
import { createEmailMedia1651972762300 } from "./src/database/migrations/1651972762300-createEmailMedia";
import { createEmailHistory1651974663732 } from "./src/database/migrations/1651974663732-createEmailHistory";
import { createEmailMediaRelation1651975332815 } from "./src/database/migrations/1651975332815-createEmailMediaRelation";
import { removeUniqueContentID1655304993610 } from './src/database/migrations/1655304993610-removeUniqueContentID';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wgo-swisspay",
  useUTC: true,
  migrationsRun: true,
  entities: [UserEntity, EmailMediaEntity, EmailHistoryEntity],
  migrations: [
    migrations1651766519693,
    createEmailMedia1651972762300,
    createEmailHistory1651974663732,
    createEmailMediaRelation1651975332815,
    removeUniqueContentID1655304993610,

  ],
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
