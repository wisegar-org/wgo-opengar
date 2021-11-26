import { AGV_MODULE, SeederAGV } from '../modules/agv';
import { CASINA_MODULE, SeederCasina } from '../modules/casina';
import { SeederWGO } from '../modules/wgo';
import { BuildSettings } from '../settings/BuildSettings';

export const callSeeders = async (buildConfig: BuildSettings) => {
  await SeederWGO();
  if (buildConfig.isModuleInConfig(AGV_MODULE)) await SeederAGV();
  if (buildConfig.isModuleInConfig(CASINA_MODULE)) await SeederCasina();
};
