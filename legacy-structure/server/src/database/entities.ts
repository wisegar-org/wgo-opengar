import { AGV_MODULE, getAGVEntities } from '../modules/agv';
import { CASINA_MODULE, getCasinaEntities } from '../modules/casina';
import { FINANCE_MODULE, getFinanceEntities } from '../modules/finance';
import { getPrintEntities, PRINT_MODULE } from '../modules/print';
import { getWGOEntities } from '../modules/wgo';
import { BuildSettings } from '../settings/BuildSettings';

export const getEntities = (buildConfig: BuildSettings) => {
  let entities: any[] = getWGOEntities();
  entities = entities.concat(buildConfig.isModuleInConfig(FINANCE_MODULE) ? getFinanceEntities() : []);
  entities = entities.concat(buildConfig.isModuleInConfig(AGV_MODULE) ? getAGVEntities() : []);
  entities = entities.concat(buildConfig.isModuleInConfig(CASINA_MODULE) ? getCasinaEntities() : []);
  entities = entities.concat(buildConfig.isModuleInConfig(PRINT_MODULE) ? getPrintEntities() : []);
  return entities;
};
