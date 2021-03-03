import { App, Response, Request } from "./routes/router";
import { requireRouterPaths } from './routes/index'
import {  GraphQlServer } from './servers/graphql';
import { DBConector } from "./database/typeorm";
import { DataSeeder } from './content/Seeder';
import Container, { Inject, Service } from "typedi";

@Service()
export class Application {
  // @Inject()
  //  dataSeeder: DataSeeder

  init = async (port, connectionName?: string | undefined,) => {
    DBConector.connect(connectionName).then(async () => {
      await GraphQlServer.bootGraphql(App)
      const dataSeeder=Container.get(DataSeeder)
      await dataSeeder.init()
      requireRouterPaths()

      App.get('/', (req: Request, res: Response) => { res.send('API Rest') })
      App.listen(port, () => console.log(`> Listening on port ${port}`))
    }, (error) => {
      console.log("Can't connect to db")
    })
  }
}


