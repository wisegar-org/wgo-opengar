import 'reflect-metadata';
import { boot, GetNodeEnvKey, GetPortKey } from '@wisegar-org/wgo-opengar-core';
import { OGConnection } from './database/DBConnections';
import { DBConector } from './database/DBConector';
import { DataSeeder } from './content/Seeder';
import { IServerOptions } from '@wisegar-org/wgo-opengar-core/build/src/server/models/ServerOptions';
import { RoleResolver } from './graphql/resolvers/RoleResolver';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { FINANCE_MODULE, InitializeGithubRouter } from './modules/finance';
import { ServerContext } from './servers/ServerContext';
import { ServerAuthenticator } from './servers/ServerAuthenticator';
import { AppResolver } from './graphql/resolvers/AppResolver';
import { BuildSettings } from './settings/BuildSettings';
import { AGV_MODULE, getAGVResolvers } from './modules/agv';
import { NonEmptyArray } from 'type-graphql';
import { MediaResolver } from './graphql/resolvers/MediaResolver';

const environment = GetNodeEnvKey();
const port = GetPortKey();
let ogConn = environment ? OGConnection.Environment : OGConnection.Development;

const buildConfig = new BuildSettings();
const resolvers: any[] = [RoleResolver, UserResolver, AppResolver, MediaResolver];
resolvers.concat(buildConfig.isModuleInConfig(AGV_MODULE) ? getAGVResolvers() : []);

DBConector.Connect(ogConn)
  .then(async (connection) => {
    const seeder = async () => {
      const dataSeeder = new DataSeeder();
      await dataSeeder.createData();
    };

    const serverOptions: IServerOptions = {
      authenticator: ServerAuthenticator,
      context: ServerContext(connection),
      formatError: (err: Error) => {
        return err;
      },
      controllers: [],
      port: parseInt(port),
      maxFileSize: 50000000,
      maxFiles: 10,
      middlewares: (app) => {
        if (buildConfig.isModuleInConfig(FINANCE_MODULE)) InitializeGithubRouter(app, connection);
      },
      resolvers: resolvers as NonEmptyArray<Function>,
    };

    boot(serverOptions, seeder);
  })
  .catch((error) => {
    console.error('\n\u001b[31m\u001b[1mPostgress connection:\n\u001b[0m', error);
    process.exit(1);
  });
