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
import { roleSuperAdminSeeder } from "@wisegar-org/wgo-base-server";
import { userAdminSeeder } from "@wisegar-org/wgo-base-server";
import { languageDefaultSeeder } from "@wisegar-org/wgo-base-server";
import { getResolverList } from "./resolvers";
import { settingsSeeder } from "./database/seeders/SettingsSeeder";
import { UsePublicHostMiddleware } from "./middlewares/HostPublicMiddleware";

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
    UsePublicHostMiddleware(app);
    UseClientSPAHostMiddleware(app);
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

  //App seeders

  // Loop function
  setTimeout(async () => {}, 0);
});
