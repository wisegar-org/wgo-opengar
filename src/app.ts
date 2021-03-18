import { App, Response, Request } from "./routes/router";
import { requireRouterPaths } from "./routes/index";
import { GraphQlServer } from "./servers/graphql";
import { DBConector } from "./database/typeorm";
import { DataSeeder } from "./content/Seeder";
import Container, { Inject, Service } from "typedi";

@Service()
export class Application {
  public async init(port, connectionName?: string | undefined) {
    try {
      const connection = await DBConector.connect(connectionName);
      if (!connection)
        throw Error(
          `Application init: Error trying to connect to the database`
        );
      await GraphQlServer.bootGraphql(App);
      const dataSeeder = Container.get(DataSeeder);
      await dataSeeder.init();
      requireRouterPaths();

      App.get("/", (req: Request, res: Response) => {
        res.send("API Rest");
      });
      App.listen(port, () => console.log(`> Listening on port ${port}`));
    } catch (error) {
      console.log(`Application init error: ${error.message}`);
    }
  }
}
