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

const port = GetPortKey();
const environment = GetNodeEnvKey();

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
  resolvers: [AppResolver] as unknown as NonEmptyArray<Function>,
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

  //Core Seeders

  //App seeders

  // Loop function
  setTimeout(async () => {}, 0);
});
