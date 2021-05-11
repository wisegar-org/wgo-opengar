import 'reflect-metadata';
import { boot, GetNodeEnvKey, GetPortKey } from '@wisegar-org/wgo-opengar-core';
import { OGConnection } from './database/DBConnections';
import { DBConector } from './database/DBConector';
import { DataSeeder } from './content/Seeder';
import { IServerOptions } from '@wisegar-org/wgo-opengar-core/build/src/server/models/ServerOptions';
import { Authenticate } from './settings/Authenticator';
import { GetContext } from './settings/UserContext';
import { RoleResolver } from './graphql/resolvers/RoleResolver';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { ClientResolver } from './graphql/resolvers/ClientResolver';
import { InitializeGithubRouter } from '@wisegar-org/wgo-github';

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
      authenticator: Authenticate,
      context: GetContext,
      formatError: (err: Error) => {
        return err;
      },
      controllers: [],
      port: parseInt(port),
      middlewares: (app) => {
        InitializeGithubRouter(app, connection);
      },
      resolvers: [ClientResolver, RoleResolver, UserResolver],
    };

    boot(serverOptions, seeder);
  })
  .catch((error) => {
    console.error('\n\u001b[31m\u001b[1mPostgress connection:\n\u001b[0m', error);
    process.exit(1);
  });
