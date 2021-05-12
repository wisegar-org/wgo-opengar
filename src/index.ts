import 'reflect-metadata';
import {
  AccessTokenData,
  boot,
  Context,
  GetNodeEnvKey,
  GetPortKey,
  UserEntity,
  validateAccessToken,
} from '@wisegar-org/wgo-opengar-core';
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
      authenticator: async (userContext, roles) => {
        console.log('authenticator userContext: ', userContext);
        console.log('authenticator roles: ', roles);
        return true;
      },
      context: async (payload: AccessTokenData) => {
        const ctx: Context = {
          user: null,
        };
        if (!payload) return ctx;
        try {
          console.log(payload);
          const user: UserEntity = await connection.getRepository(UserEntity).findOne({
            where: { id: payload.userId },
            relations: ['roles'],
          });
          if (!user) return ctx;
          ctx.user = {
            applicazioni: null,
            email: user.email,
            extra: null,
            permissions: null,
            roles: user.roles.map((role) => role.name),
            sessionId: '',
            userId: user.id.toString(),
          };
          return ctx;
        } catch (error) {
          throw error;
        }

        return ctx;
      },
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
