export { SeederAGV } from './seeder';
export { InitializeAGVMiddlewares } from './middleware';

import AGVEventEntity from './database/entities/AGVEventEntity';
import { AGVInscriptionEntity } from './database/entities/AGVInscriptionEntity';
import AGVPollEntity from './database/entities/AGVPollEntity';
import { AGVEventResolver, AGVPollResolver } from './resolvers';
import { AGVInscriptionResolver } from './resolvers/AGVInscriptionResolver';

export const getAGVResolvers = () => {
  return [AGVEventResolver, AGVPollResolver, AGVInscriptionResolver];
};

export const getAGVEntities = () => {
  return [AGVEventEntity, AGVPollEntity, AGVInscriptionEntity] as any[];
};

export const AGV_MODULE = 'agv';
