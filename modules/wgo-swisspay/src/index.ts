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
import { UseClientSPAHostMiddleware } from "./middlewares/HostClientMiddleware";
import { Express } from "express";
import { dataSourceOptions, PostgresDataSource } from "../dataSources";
import { UserEntity } from "./database/entities/UserEntity";
import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";
import { createDatabase } from "typeorm-extension";

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

  const adminUserEmail = "admin@wisegar.org";

  const userRepository = PostgresDataSource.getRepository(UserEntity);
  const adminUserResult = await userRepository.findOne({
    where: { email: adminUserEmail },
  });
  if (IsNullOrUndefined(adminUserResult)) {
    const adminUser = new UserEntity();
    adminUser.email = adminUserEmail;
    adminUser.userName = adminUserEmail;
    adminUser.isEmailConfirmed = true;
    adminUser.name = "Admin";
    adminUser.lastName = "User";
    adminUser.password = "Wisegar.-0";
    const adminUserRegistered = await userRepository.save(adminUser);
    if (!IsNullOrUndefined(adminUserRegistered))
      console.debug(`Admin User registered: ${adminUserRegistered.email}`);
  }
});
