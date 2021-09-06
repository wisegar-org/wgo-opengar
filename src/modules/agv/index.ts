import { CreatePathInPrivateFolder, CreatePathInPublicFolder } from '../../settings/ConfigService';
import AGVEventEntity from './database/entities/AGVEventEntity';
import AGVPollEntity from './database/entities/AGVPollEntity';
import { AGVEventResolver, AGVPollResolver } from './resolvers';

export const getAGVResolvers = () => {
  return [AGVEventResolver, AGVPollResolver];
};

export const getAGVEntities = () => {
  return [AGVEventEntity, AGVPollEntity] as any[];
};

export const AGV_MODULE = 'agv';
