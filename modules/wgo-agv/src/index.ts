import "reflect-metadata";
import {
  boot,
  ExpirationFreqEnum,
  IServerOptions,
  NonEmptyArray,
  UseRestMiddleware,
} from "@wisegar-org/wgo-server";
import {
  GetPortKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "@wisegar-org/wgo-settings";
import { AuthenticationHandler } from "./handlers/AuthenticationHandler";
import { AppContextHandler, ctx } from "./handlers/AppContextHandler";
import { errorHandler } from "./handlers/ErrorHandler";
import { AppController } from "./controllers/AppController";
import { Express } from "express";
import { dataSourceOptions, PostgresDataSource } from "./dataSources";
import { createDatabase } from "typeorm-extension";
import {
  UseClientSPAHostMiddleware,
  UsePublicMediaHostMiddleware,
} from "./middlewares/HostClientMiddleware";
import { roleSuperAdminSeeder } from "./wgo-base/authentication/database/seeder/roles";
import { userAdminSeeder } from "./wgo-base/authentication/database/seeder/user";
import { languageDefaultSeeder } from "./wgo-base/language/database/seeder/language";
import { getResolverList } from "./resolvers";
import { settingsSeeder } from "./database/seeders/SettingsSeeder";
import { agvTemplateSeeder } from "./database/seeders/TemplateSeeder";
import { mediaPublicSeeder } from "./wgo-base/storage/database/seeder/media";
import { agvAdminUserSeeder } from "./database/seeders/AdminUserSeeder";

const port = GetPortKey();

const serverOptions: IServerOptions = {
  authenticator: AuthenticationHandler,
  context: AppContextHandler,
  formatError: errorHandler,
  controllers: [AppController],
  port: parseInt(port),
  maxFileSize: 5000000000,
  maxFiles: 10,
  useCors: true,
  middlewares: (app: Express) => {
    UseClientSPAHostMiddleware(app);
    UsePublicMediaHostMiddleware(app);
    UseRestMiddleware(serverOptions);
  },
  resolvers: getResolverList(),
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  expiresIn: GetExpiresInKey(),
  expirationFreq: ExpirationFreqEnum.Low,
};
boot(serverOptions, async () => {
  console.log("Start other services here. ex. database connections");

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

  //Init db settings
  await settingsSeeder(dataSource);

  //Core Seeders
  await roleSuperAdminSeeder(dataSource); //create superadmin rol
  await userAdminSeeder(dataSource); //create admin user with superadmin rol
  await languageDefaultSeeder(dataSource); //create default language
  mediaPublicSeeder({ ...ctx, dataSource }); //export public media files

  //App seeders
  await agvTemplateSeeder(dataSource);
  await agvAdminUserSeeder(dataSource);

  // Loop function
  setTimeout(async () => {}, 0);
});
