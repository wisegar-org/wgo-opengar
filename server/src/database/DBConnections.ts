import { ConnectionOptions } from 'typeorm';
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from '@wisegar-org/wgo-settings';
import { BuildSettings } from '../settings/BuildSettings';
import { getEntities } from './entities';

export enum OGConnection {
  Development = 0,
  Staging = 1,
  Production = 2,
  Environment = 3,
}

export const getConnectionOptions = (buildConfig: BuildSettings) => {
  const entities = getEntities(buildConfig);
  console.log('Loaded entities: ', entities);
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
