import "reflect-metadata";
import { roleSuperAdminSeeder, userAdminSeeder } from "./authentication";
import {
  ExpirationFreqEnum,
  IServerOptions,
  NonEmptyArray,
  UseCorsMiddleware,
  UseGqlServer,
  UseJwtMiddleware,
  UseRestMiddleware,
} from "wgo-server";
import { AuthenticationHandler } from "./wgo/handlers/AuthenticationHandler";
import { AppContextHandler, ctx } from "./wgo/handlers/AppContextHandler";
import { createDatabase } from "typeorm-extension";
import { agvAdminUserSeeder } from "./agv/database/seeders/AdminUserSeeder";
import { agvTemplateSeeder } from "./agv/database/seeders/TemplateSeeder";
import { languageDefaultSeeder } from "./language";
import { mediaPublicSeeder } from "./storage";
import { dataSourceOptions, PostgresDataSource } from "./wgo/dataSources";
import { settingsSeeder } from "./wgo/database/seeders/SettingsSeeder";
import { errorHandler } from "./wgo/handlers/ErrorHandler";
import { UseStaticMediaFilesMiddleware } from "./wgo/middlewares/StaticMediaFilesMiddleware";
import { getResolvers } from "./wgo/resolvers";
export {} from "wgo-server";
export { Query, Resolver, Field, InputType } from "type-graphql";
export {
  Controller,
  Get,
  Post,
  Put,
  boot,
  ExpirationFreqEnum,
  IServerOptions,
  NonEmptyArray,
  UseCorsMiddleware,
  UseGqlServer,
  UseJwtMiddleware,
  UseRestMiddleware,
} from "wgo-server";

export {
  GetPortKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "wgo-settings";

export { AuthenticationHandler } from "./wgo/handlers/AuthenticationHandler";
export { AppContextHandler, ctx } from "./wgo/handlers/AppContextHandler";
export { errorHandler } from "./wgo/handlers/ErrorHandler";
export { createDatabase } from "typeorm-extension";
export { agvAdminUserSeeder } from "./agv/database/seeders/AdminUserSeeder";
export { agvTemplateSeeder } from "./agv/database/seeders/TemplateSeeder";
export { roleSuperAdminSeeder, userAdminSeeder } from "./authentication";
export { languageDefaultSeeder } from "./language";
export { mediaPublicSeeder } from "./storage";
export { dataSourceOptions, PostgresDataSource } from "./wgo/dataSources";
export { settingsSeeder } from "./wgo/database/seeders/SettingsSeeder";
export { UseStaticMediaFilesMiddleware } from "./wgo/middlewares/StaticMediaFilesMiddleware";

export {
  CoreResolver,
  AuthResolver,
  LanguageResolver,
  PublicTranslationResolver,
  SettingsResolver,
  PublicMediaResolver,
  ContactMeResolver,
  TemplateResolver,
  TranslationResolver,
  HistoricResolver,
  MediaResolver,
  EmailResolver,
  StorageResolver,
  IndexContentResolver,
  FinanceIssuesResolver,
  FinanceIssuesOptionsResolver,
  AGVEventResolver,
  AGVContentsResolver,
  AGVNewsletterResolver,
  AGVInscriptionResolver,
} from "./wgo/resolvers";

import express from "express";

import {
  GetPortKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "wgo-settings";

export async function run(
  app: any,
  controllers?: Array<any>,
  resolvers?: Array<any>
) {
  const port = GetPortKey();
  const options: IServerOptions = {
    app: app,
    authenticator: AuthenticationHandler,
    context: AppContextHandler,
    formatError: errorHandler,
    controllers: controllers ? controllers : [],
    port: parseInt(port),
    maxFileSize: 5000000000,
    maxFiles: 10,
    useCors: true,
    middlewares: (app: any) => {
      // UseHostAdminMiddleware(app);
      // UseTemplatingMiddleware(app);
      UseStaticMediaFilesMiddleware(app);
      UseRestMiddleware(options);
    },
    resolvers: getResolvers(),
    privateKey: GetPrivateKey(),
    publicKey: GetPublicKey(),
    expiresIn: GetExpiresInKey(),
    expirationFreq: ExpirationFreqEnum.Low,
    gqlValidateSettings: {
      forbidUnknownValues: false,
    },
  };

  options.app.use(express.json());

  options.expirationFreq = options.expirationFreq
    ? options.expirationFreq
    : ExpirationFreqEnum.Normal;

  console.debug("Registering Cors middleware");
  UseCorsMiddleware(options);

  console.debug("Registering Jwt middleware");
  UseJwtMiddleware(options);

  if (options.controllers && options.controllers.length > 0) {
    console.debug("Registering Rest middleware");
    UseRestMiddleware(options);
  }

  if (options.resolvers && options.resolvers.length > 0) {
    console.debug("Registering Graphql middleware");
    UseGqlServer(options);
  }

  if (options.middlewares) {
    console.debug("Registering Extras middleware");
    options.middlewares(options.app);
  }

  //Init db init
  console.debug("Database creation & migrations");
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

  //Start server
  options.app.listen(options.port, () => {
    console.log(`Server is running on port ${options.port}`);
  });
  // Loop function
  setTimeout(async () => {
    // loopUpdateIssues();
  }, 0);
}

const app = express();

run(app);
