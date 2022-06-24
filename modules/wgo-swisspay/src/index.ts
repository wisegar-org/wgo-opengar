import 'reflect-metadata';
import { boot, IServerOptions, NonEmptyArray, UseRestMiddleware } from '@wisegar-org/wgo-server';
import { GetPortKey, GetNodeEnvKey, GetPrivateKey, GetPublicKey, GetExpiresInKey } from '@wisegar-org/wgo-settings';
import { AuthenticationHandler } from './handlers/AuthenticationHandler';
import { AppContextHandler } from './handlers/AppContextHandler';
import { errorHandler } from './handlers/ErrorHandler';
import { AppController } from './controllers/AppController';
import { UseClientSPAHostMiddleware } from './middlewares/HostClientMiddleware';
import { Express } from 'express';
import { dataSourceOptions, PostgresDataSource } from '../dataSources';
import { createDatabase } from 'typeorm-extension';
import { getResolverList } from './resolvers';
import { EmailController } from './controllers/EmailController';
import { loopReadEmails } from './services/Pop3Service';

//base seeders
import { roleSuperAdminSeeder } from '../../wgo-base/authentication/database/seeder/roles';
import { userAdminSeeder } from '../../wgo-base/authentication/database/seeder/user';
import { languageDefaultSeeder } from '../../wgo-base/language/database/seeder/language';

const port = GetPortKey();
const environment = GetNodeEnvKey();

const serverOptions: IServerOptions = {
  authenticator: AuthenticationHandler,
  context: AppContextHandler,
  formatError: errorHandler,
  controllers: [AppController, EmailController],
  port: parseInt(port),
  maxFileSize: 5000000000,
  maxFiles: 10,
  useCors: true,
  middlewares: (app: Express) => {
    UseClientSPAHostMiddleware(app);
    UseRestMiddleware(serverOptions);
  },
  resolvers: getResolverList(),
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  expiresIn: GetExpiresInKey(),
};
boot(serverOptions, async () => {
  console.log('Start other services here. ex. database connections');

  await createDatabase({
    ifNotExist: true,
    options: {
      ...dataSourceOptions,
      migrationsRun: false,
      entities: [],
      migrations: [],
    },
  });
  const dataSource = await PostgresDataSource.initialize();
  if (!dataSourceOptions.migrationsRun) {
    dataSource.runMigrations();
  }

  //Seeders
  roleSuperAdminSeeder(dataSource); //create superadmin rol
  userAdminSeeder(dataSource); //create admin user with superadmin rol
  languageDefaultSeeder(dataSource); //create default language

  // Loop through all emails in the inbox and save them to the database
  setTimeout(async () => {
    loopReadEmails();
  }, 0);
});
