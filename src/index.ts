import 'reflect-metadata';
import {
  AccessTokenData,
  boot,
  Context,
  GetDBHostKey,
  GetNodeEnvKey,
  GetPortKey,
  UserEntity,
  validateAccessToken,
} from '@wisegar-org/wgo-opengar-core';
import { OGConnection } from './database/DBConnections';
import { DBConector } from './database/DBConector';
import { DataSeeder } from './content/Seeder';
import { IServerOptions } from '@wisegar-org/wgo-opengar-core/build/src/server/models/ServerOptions';
import { RoleResolver } from './graphql/resolvers/RoleResolver';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { InitializeGithubRouter } from './modules/finance';
import { ServerContext } from './servers/ServerContext';
import { ServerAuthenticator } from './servers/ServerAuthenticator';
import { AppResolver } from './graphql/resolvers/AppResolver';

const environment = GetNodeEnvKey();
const port = GetPortKey();
let ogConn = environment ? OGConnection.Environment : OGConnection.Development;

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
      middlewares: (app) => {
        InitializeGithubRouter(app, connection);
      },
      resolvers: [RoleResolver, UserResolver, AppResolver],
    };

    boot(serverOptions, seeder);
  })
  .catch((error) => {
    console.error('\n\u001b[31m\u001b[1mPostgress connection:\n\u001b[0m', error);
    process.exit(1);
  });
