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
import { IServerOptions } from '@wisegar-org/wgo-opengar-core/build/src/server/models/IServerOptions';
import { callSeeders } from './seeder';
import { initializeMiddlewares } from './middlewares';
import { getResolvers } from './resolvers';
import { BuildSettings } from './settings/BuildSettings';
import { formatError } from './settings/ErrorSettings';
import { DBConector, OGConnection } from './database';
import { ServerAuthenticator, ServerContext } from './modules/wgo/servers';

const buildConfig = new BuildSettings();
const port = GetPortKey();
const environment = GetNodeEnvKey();
let ogConn = environment ? OGConnection.Environment : OGConnection.Development;

DBConector.Connect(buildConfig, ogConn)
  .then(async (connection) => {
    const serverOptions: IServerOptions = {
      authenticator: ServerAuthenticator,
      context: ServerContext,
      formatError: formatError,
      controllers: [],
      port: parseInt(port),
      maxFileSize: 5000000000,
      maxFiles: 10,
      middlewares: (app) => initializeMiddlewares(buildConfig, app, connection),
      resolvers: getResolvers(buildConfig),
    };
    boot(serverOptions, () => callSeeders(buildConfig));
  })
  .catch((error) => {
    console.error('\n\u001b[31m\u001b[1mPostgress connection:\n\u001b[0m', error);
    process.exit(1);
  });
