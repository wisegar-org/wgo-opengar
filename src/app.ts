import { OGConnection } from './database/DBConnections';
import { Response, Request } from "express";
import { GraphQlServer } from "./servers/graphql";
import { DBConector } from "./database/DBConector";
import { DataSeeder } from "./content/Seeder";
import Container, { Inject, Service } from "typedi";
import express = require("express");
import { InitializeRouter } from "./rest/routes/router";
import { UserDataService } from '@wisegar-org/wgo-opengar-core';
require('@wisegar-org/wgo-opengar-core/dist/src/services/UserDataService')

@Service()
export class Application {
  public async init(port: any) {
    try {
      const App = express();

      let ogConn = OGConnection.Development
      // if DATABASE_URL
      if(process.env.DATABASE_URL)
      {
        ogConn = OGConnection.Production
      }

      const connection = await DBConector.Connect(ogConn);
      if (!connection)
        throw Error(
          `Application init: Error trying to connect to the database`
        );
      Container.set(UserDataService, UserDataService)
      await GraphQlServer.bootGraphql(App);
      const dataSeeder = Container.get(DataSeeder);
      await dataSeeder.init(connection);
      InitializeRouter(App);
      App.get("/", (req: Request, res: Response) => {
        res.send("API Rest");
      });
      App.listen(port, () => console.log(`> Listening on port ${port}`));
    } catch (error) {
      console.log(`Application init error: ${error.message}`);
      process.exit(1);
    }
  }
}
