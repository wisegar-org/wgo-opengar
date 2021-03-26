import { createConnection, Connection, ConnectionOptions } from "typeorm";
export { Connection, Repository } from "typeorm";
import _ from "lodash";

import {
  OGConnection,
  developmentConnection,
  productionConnection,
  stagingConnection,
} from "./connections";
import { Service } from "typedi";

@Service()
export class ConnectionService {
  private static connection: Connection;

  public async getConnection() {
    if (!ConnectionService.connection) {
      ConnectionService.connection = await this.Connect();
    }
    return ConnectionService.connection;
  }

  /**
   * Get the typeorm connection options
   * @param connection OGConnection enum value
   * @returns If no params return development connection. Environment enum returns the corrispondent OGConnection.
   */
  private async getConnectionOptions(
    connection?: OGConnection
  ): Promise<ConnectionOptions> {
    switch (connection) {
      case OGConnection.Development: {
        return developmentConnection;
      }
      case OGConnection.Staging: {
        return stagingConnection;
      }
      case OGConnection.Production: {
        return productionConnection;
      }
      case OGConnection.Environment: {
        if (process.env.NODE_ENV === "development")
          return developmentConnection;
        if (process.env.NODE_ENV === "staging") return stagingConnection;
        if (process.env.NODE_ENV === "production") return productionConnection;
        throw Error(
          "No valid environment value was found on '.env' file. Impossible to determinate a connection options value to return."
        );
      }
      default: {
        return developmentConnection;
      }
    }
  }

  public async Connect(connectionType?: OGConnection): Promise<Connection> {
    if (!connectionType) connectionType = OGConnection.Environment;
    const connectionOptions = await this.getConnectionOptions(connectionType);
    let connection: any;
    try {
      if (!_.isUndefined(connectionOptions)) {
        console.log(
          `DBConector: trying to connect to ${connectionOptions.name} connection`
        );
        connection = await createConnection(connectionOptions);
      } else {
        console.log(
          "DBConector: Impossible to retrieve a valid connection options"
        );
      }
    } catch (error) {
      console.log(`DBConector connect. Error: ${error.message}`);
    }
    if (connection)
      console.log(`DBConector: connection successfully stabilished`);
    return connection;
  }
}
