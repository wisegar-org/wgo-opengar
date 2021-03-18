import { createConnection, Connection } from "typeorm";
export { Connection, Repository } from "typeorm";
import _ from "lodash";
import { InjectConnection } from "typeorm-typedi-extensions";
import { Service } from "typedi";

/**TODO: Implement singleton service pattern */
@Service()
export class DBConector {
  @InjectConnection()
  private _connection: Connection;

  public static async connect(connectionName?: string): Promise<Connection> {
    let connection: any;
    try {
      if (!_.isEmpty(connectionName) || !_.isUndefined(connectionName)) {
        console.log(
          `DBConector: trying to connect to ${connectionName} connection`
        );
        connection = await createConnection(connectionName);
      } else {
        console.log("DBConector: trying to connect to default connection");
        connection = await createConnection();
      }
    } catch (error) {
      console.log(`DBConector connect. Error: ${error.message}`);
    }
    if (connection)
      console.log(`DBConector: connection successfully stabilished`);
    return connection;
  }
}
