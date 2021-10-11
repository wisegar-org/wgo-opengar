import { ContactEntity } from './database/entities/ContactEntity';
import { ContactResolver } from './modules/Contact/ContactResolver';
export { InitializeCasinaMiddlewares } from './middleware';
export { SeederCasina } from './seeder';

export const getCasinaResolvers = () => {
  return [
    ContactResolver
  ];
};

export const getCasinaEntities = () => {
  return [
    ContactEntity
  ] as any[];
};

export const CASINA_MODULE = 'casina';
