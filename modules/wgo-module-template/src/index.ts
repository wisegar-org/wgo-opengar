import "reflect-metadata";
import {
  boot,
  IServerOptions,
  NonEmptyArray,
  UseRestMiddleware,
} from "@wisegar-org/wgo-server";
import {
  GetPortKey,
  GetNodeEnvKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "@wisegar-org/wgo-settings";
import { AuthenticationHandler } from "./handlers/AuthenticationHandler";
import { AppContextHandler } from "./handlers/AppContextHandler";
import { errorHandler } from "./handlers/ErrorHandler";
import { AppController } from "./controllers/AppController";
import { AppResolver } from "./resolvers/AppResolver";
import { Express } from "express";
import { dataSourceOptions, PostgresDataSource } from "./dataSources";
import { createDatabase } from "typeorm-extension";
import { UseClientSPAHostMiddleware } from "./middlewares/HostClientMiddleware";
import { roleSuperAdminSeeder } from "./wgo-base/authentication/database/seeder/roles";
import { userAdminSeeder } from "./wgo-base/authentication/database/seeder/user";
import { languageDefaultSeeder } from "./wgo-base/language/database/seeder/language";
import { getResolverList } from "./resolvers";
import { settingsSeeder } from "./database/seeders/SettingsSeeder";

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
    UseRestMiddleware(serverOptions);
  },
  resolvers: getResolverList(),
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  expiresIn: GetExpiresInKey(),
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
  settingsSeeder(dataSource);

  //Core Seeders
  roleSuperAdminSeeder(dataSource); //create superadmin rol
  userAdminSeeder(dataSource); //create admin user with superadmin rol
  languageDefaultSeeder(dataSource); //create default language

  //App seeders

  // Loop function
  setTimeout(async () => {}, 0);
});
