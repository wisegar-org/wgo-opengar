import { ssrMiddleware } from "quasar/wrappers";
export default ssrMiddleware(async ({ app }) => {
  console.log("Serbver middleware started!", app);
});
// /* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { AppVersionsController } from "../../modules/core/controllers/AppController";
// import { AppResolver } from "../../modules/core/resolvers/AppResolver";
// import {
//   ExpirationFreqEnum,
//   IServerOptions,
//   NonEmptyArray,
//   UseCorsMiddleware,
//   UseGqlServer,
//   UseJwtMiddleware,
//   UseRestMiddleware,
//   GetPortKey,
//   GetPrivateKey,
//   GetPublicKey,
//   GetExpiresInKey,
//   AuthenticationHandler,
//   AppContextHandler,
//   ctx,
//   errorHandler,
//   createDatabase,
//   agvAdminUserSeeder,
//   agvTemplateSeeder,
//   roleSuperAdminSeeder,
//   userAdminSeeder,
//   languageDefaultSeeder,
//   mediaPublicSeeder,
//   dataSourceOptions,
//   PostgresDataSource,
//   settingsSeeder,
//   UseStaticMediaFilesMiddleware,
//   AGVContentsResolver,
//   AGVEventResolver,
//   AGVInscriptionResolver,
//   AGVNewsletterResolver,
//   AuthResolver,
//   ContactMeResolver,
//   EmailResolver,
//   FinanceIssuesOptionsResolver,
//   FinanceIssuesResolver,
//   HistoricResolver,
//   IndexContentResolver,
//   LanguageResolver,
//   MediaResolver,
//   PublicMediaResolver,
//   PublicTranslationResolver,
//   SettingsResolver,
//   StorageResolver,
//   TemplateResolver,
//   TranslationResolver,
//   CoreResolver,
// } from "@wisegar-org/wgo-base-server";

// export default ssrMiddleware(async ({ app }) => {

//   const controllers = [AppVersionsController];
//   const resolvers = [
//     AppResolver,
//     CoreResolver,
//     AuthResolver,
//     LanguageResolver,
//     PublicTranslationResolver,
//     SettingsResolver,
//     PublicMediaResolver,
//     ContactMeResolver,
//     TemplateResolver,
//     TranslationResolver,
//     HistoricResolver,
//     MediaResolver,
//     EmailResolver,
//     StorageResolver,
//     IndexContentResolver,
//     FinanceIssuesResolver,
//     FinanceIssuesOptionsResolver,
//     AGVEventResolver,
//     AGVContentsResolver,
//     AGVNewsletterResolver,
//     AGVInscriptionResolver,
//   ] as unknown as NonEmptyArray<Function>;

//   const port = GetPortKey();
//   const options: IServerOptions = {
//     app: app,
//     authenticator: AuthenticationHandler,
//     context: AppContextHandler,
//     formatError: errorHandler,
//     controllers: controllers ? controllers : [],
//     port: parseInt(port),
//     maxFileSize: 5000000000,
//     maxFiles: 10,
//     useCors: true,
//     middlewares: (app: any) => {
//       UseStaticMediaFilesMiddleware(app);
//       UseRestMiddleware(options);
//     },
//     resolvers: resolvers,
//     privateKey: GetPrivateKey(),
//     publicKey: GetPublicKey(),
//     expiresIn: GetExpiresInKey(),
//     expirationFreq: ExpirationFreqEnum.Low,
//     gqlValidateSettings: {
//       forbidUnknownValues: false,
//     },
//   };

//   options.expirationFreq = options.expirationFreq
//     ? options.expirationFreq
//     : ExpirationFreqEnum.Normal;

//   console.debug("Registering Cors middleware");
//   UseCorsMiddleware(options);

//   console.debug("Registering Jwt middleware");
//   UseJwtMiddleware(options);

//   if (options.controllers && options.controllers.length > 0) {
//     console.debug("Registering Rest middleware");
//     UseRestMiddleware(options);
//   }

//   if (options.resolvers && options.resolvers.length > 0) {
//     console.debug("Registering Graphql middleware");
//     UseGqlServer(options);
//   }

//   if (options.middlewares) {
//     console.debug("Registering Extras middleware");
//     options.middlewares(options.app);
//   }

//   await createDatabase({
//     ifNotExist: true,
//     options: {
//       ...dataSourceOptions,
//       migrationsRun: false,
//       entities: [],
//       migrations: [],
//     },
//   });
//   const dataSource = await PostgresDataSource.initialize();
//   if (!dataSourceOptions.migrationsRun) {
//     dataSource.runMigrations();
//   }

//   //Init db settings
//   await settingsSeeder(dataSource);

//   //Core Seeders
//   await roleSuperAdminSeeder(dataSource); //create superadmin rol
//   await userAdminSeeder(dataSource); //create admin user with superadmin rol
//   await languageDefaultSeeder(dataSource); //create default language
//   mediaPublicSeeder({ ...ctx, dataSource }); //export public media files

//   //App seeders
//   await agvTemplateSeeder(dataSource);
//   await agvAdminUserSeeder(dataSource);

//   // Loop function
//   setTimeout(async () => {
//     // loopUpdateIssues();
//   }, 0);
// });
