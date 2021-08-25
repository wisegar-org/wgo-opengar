import { ConnectionOptions } from 'typeorm';
import { UserEntity, MediaEntity, Session, RolEntity, TemplateEntity } from '@wisegar-org/wgo-opengar-core';
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from '@wisegar-org/wgo-opengar-core';

import { FINANCE_MODULE, getFinanceEntities } from '../modules/finance';
import { AGV_MODULE, getAGVEntities } from '../modules/agv';
import { BuildSettings } from '../settings/BuildSettings';

const buildConfig = new BuildSettings();

const entities: any[] = [UserEntity, MediaEntity, Session, RolEntity, TemplateEntity]
  .concat(buildConfig.isModuleInConfig(FINANCE_MODULE) ? getFinanceEntities() : [])
  .concat(buildConfig.isModuleInConfig(AGV_MODULE) ? getAGVEntities() : []);

console.log('Loaded entities: ', entities);

export enum OGConnection {
  Development = 0,
  Staging = 1,
  Production = 2,
  Environment = 3,
}

export const getConnectionOptions = () => {
  const dbHost: string = GetDBHostKey();
  const dbPort: number = parseInt(GetDBPortKey());
  const dbName: string = GetDBNameKey();
  const dbUser: string = GetDBUserNameKey();
  const dbPassword: string = GetDBPasswordKey();

  return <ConnectionOptions>{
    name: 'default',
    type: 'postgres',
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    logging: false,
    synchronize: true,
    entities: entities,
  };
};
