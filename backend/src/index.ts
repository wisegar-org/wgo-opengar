import "reflect-metadata";
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
