import "reflect-metadata";
import {
  boot,
  ExpirationFreqEnum,
  IServerOptions,
  UseRestMiddleware,
} from "@wisegar-org/wgo-server";
import {
  GetPortKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "@wisegar-org/wgo-settings";
import { AuthenticationHandler } from "./handlers/AuthenticationHandler";
import { AppContextHandler } from "./handlers/AppContextHandler";
import { errorHandler } from "./handlers/ErrorHandler";
import { AppController } from "./controllers/AppController";
import express, { Express } from "express";
import { dataSourceOptions, PostgresDataSource } from "./dataSources";
import { createDatabase } from "typeorm-extension";
import {
  GetHandlebarRootKey,
  GetHandlebarStaticsKey,
  GetWebRootKey,
  UseClientSPAHostMiddleware,
} from "./middlewares/HostClientMiddleware";
import { roleSuperAdminSeeder } from "@wisegar-org/wgo-base-server";
import { userAdminSeeder } from "@wisegar-org/wgo-base-server";
import { languageDefaultSeeder } from "@wisegar-org/wgo-base-server";
import { getResolverList } from "./resolvers";
import { settingsSeeder } from "./database/seeders/SettingsSeeder";
import { loopUpdateIssues } from "./services/Finance/FinanceUpdateIssuesService";
import { engine } from "express-handlebars";

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
    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    const viewPath = GetHandlebarRootKey();
    app.set("views", viewPath);

    app.use("/", express.static(GetHandlebarStaticsKey()));

    const elements = [
      {
        name: "Leche",
        age: 2,
      },
      {
        name: "Pan",
        age: 4,
      },
    ];
    app.get("/hb", (req, res) => {
      res.render("home", {
        title: "Express running",
        admin: true,
        elements: elements,
      });
    });
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
  setTimeout(async () => {
    loopUpdateIssues();
  }, 0);
});