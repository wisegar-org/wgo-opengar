import { ContactEntity } from './database/entities/ContactEntity';
import { ContactResolver } from './modules/Contact/ContactResolver';
import CasinaModuleEntity from './database/entities/CasinaModuleEntity';
import { IndexContentResolver } from './modules/IndexContent/IndexContentResolver';

export { InitializeCasinaMiddlewares } from './middleware';
export { SeederCasina } from './seeder';

export const getCasinaResolvers = () => {
  return [ContactResolver, IndexContentResolver];
};

export const getCasinaEntities = () => {
  return [ContactEntity, CasinaModuleEntity] as any[];
};

export const CASINA_MODULE = 'casina';
