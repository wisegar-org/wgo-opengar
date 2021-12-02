import { Express } from 'express';
import { Connection } from 'typeorm';
import { AGV_MODULE, InitializeAGVMiddlewares } from '../modules/agv';
import { CASINA_MODULE, InitializeCasinaMiddlewares } from '../modules/casina';
import { FINANCE_MODULE, InitializeGithubRouter } from '../modules/finance';
import { InitializePrintMiddlewares, PRINT_MODULE } from '../modules/print';
import { HostClientMiddleware } from '../modules/wgo';
import { PublicClientMiddleware } from '../modules/wgo/middlewares/PublicClientMiddleware';
import { BuildSettings } from '../settings/BuildSettings';

export const initializeMiddlewares = (buildConfig: BuildSettings, app: Express, connection: Connection) => {
  //TODO: Use Host Client Middleware only if configured
  HostClientMiddleware(app);
  PublicClientMiddleware(app);
  if (buildConfig.isModuleInConfig(FINANCE_MODULE)) InitializeGithubRouter(app, connection);
  if (buildConfig.isModuleInConfig(AGV_MODULE)) InitializeAGVMiddlewares(app);
  if (buildConfig.isModuleInConfig(CASINA_MODULE)) InitializeCasinaMiddlewares(app);
  if (buildConfig.isModuleInConfig(PRINT_MODULE)) InitializePrintMiddlewares(app);
};
