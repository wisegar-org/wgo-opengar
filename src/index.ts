import 'reflect-metadata';
import { boot, GetNodeEnvKey, GetPortKey } from '@wisegar-org/wgo-opengar-core';
import { IServerOptions } from '@wisegar-org/wgo-opengar-core/build/src/server/models/IServerOptions';
import { OGConnection, DBConector } from './database';
import { DataSeeder } from './content/Seeder';
import { ServerContext, ServerAuthenticator } from './servers';
import { BuildSettings } from './settings/BuildSettings';
import { NonEmptyArray } from 'type-graphql';
import { ApolloError } from 'apollo-client';
import { HostClientMiddleware } from './middlewares/HostClientMiddleware';
import { getWGOResolvers } from './graphql/resolvers';

import { FINANCE_MODULE, InitializeGithubRouter } from './modules/finance';
import { AGV_MODULE, getAGVResolvers, SedderAGV, InitializeAGVMiddlewares } from './modules/agv';
import { CASINA_MODULE, getCasinaResolvers, InitializeCasinaMiddlewares, SedderCasina } from './modules/casina';

const environment = GetNodeEnvKey();
const port = GetPortKey();
let ogConn = environment ? OGConnection.Environment : OGConnection.Development;

const buildConfig = new BuildSettings();
let resolvers: any[] = getWGOResolvers();
resolvers = resolvers.concat(buildConfig.isModuleInConfig(AGV_MODULE) ? getAGVResolvers() : []);
resolvers = resolvers.concat(buildConfig.isModuleInConfig(CASINA_MODULE) ? getCasinaResolvers() : []);

DBConector.Connect(ogConn)
  .then(async (connection) => {
    const seeder = async () => {
      const dataSeeder = new DataSeeder();
      await dataSeeder.createData();
      if (buildConfig.isModuleInConfig(AGV_MODULE)) await SedderAGV();
      if (buildConfig.isModuleInConfig(CASINA_MODULE)) await SedderCasina();
    };

    const serverOptions: IServerOptions = {
      authenticator: ServerAuthenticator,
      context: ServerContext,
      formatError: (err: Error) => {
        console.log(err);
        return new ApolloError({
          errorMessage: err.message,
        });
      },
      controllers: [],
      port: parseInt(port),
      maxFileSize: 5000000000,
      maxFiles: 10,
      middlewares: (app) => {
        //TODO: Use Host Client Middleware only if configured
        HostClientMiddleware(app);
        if (buildConfig.isModuleInConfig(FINANCE_MODULE)) InitializeGithubRouter(app, connection);
        if (buildConfig.isModuleInConfig(AGV_MODULE)) InitializeAGVMiddlewares(app);
        if (buildConfig.isModuleInConfig(CASINA_MODULE)) InitializeCasinaMiddlewares(app);
      },
      resolvers: resolvers as NonEmptyArray<Function>,
    };

    boot(serverOptions, seeder);
  })
  .catch((error) => {
    console.error('\n\u001b[31m\u001b[1mPostgress connection:\n\u001b[0m', error);
    process.exit(1);
  });
