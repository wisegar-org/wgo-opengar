import { FINANCE_MODULE, getFinanceResolvers, } from './../modules/finance/index';
import { NonEmptyArray } from 'type-graphql';
import { AGV_MODULE, getAGVResolvers } from '../modules/agv';
import { CASINA_MODULE, getCasinaResolvers } from '../modules/casina';
import { getWGOResolvers } from '../modules/wgo';
import { BuildSettings } from '../settings/BuildSettings';

export const getResolvers = (buildConfig: BuildSettings) => {
  let resolvers: any[] = getWGOResolvers();
  resolvers = resolvers.concat(buildConfig.isModuleInConfig(AGV_MODULE) ? getAGVResolvers() : []);
  resolvers = resolvers.concat(buildConfig.isModuleInConfig(CASINA_MODULE) ? getCasinaResolvers() : []);
  resolvers = resolvers.concat(buildConfig.isModuleInConfig(FINANCE_MODULE) ? getFinanceResolvers() : []);
  return resolvers as NonEmptyArray<Function>;
};
