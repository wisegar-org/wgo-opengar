import {
  createConnection,
  Connection,
  ConnectionOptions,
  getConnection,
  getConnectionManager,
} from "typeorm";
export { Connection, Repository } from "typeorm";
import _ from "lodash";
import Container, { Service } from "typedi";
import {
  OGConnection,
  developmentConnection,
  productionConnection,
  stagingConnection,
} from "./DBConnections";

@Service()
export class DBConector {
  private _connection: Connection;

  /**
   * Get the typeorm connection options
   * @param connection OGConnection enum value
   * @returns If no params return development connection. Environment enum returns the corrispondent OGConnection.
   */
  private static async GetConnectionOptions(
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

  public static async Connect(
    connectionType?: OGConnection
  ): Promise<Connection> {
    const connectionOptions = await DBConector.GetConnectionOptions(
      connectionType
    );
    let connection: Connection;
    try {
      if (!_.isUndefined(connectionOptions)) {
        console.log(
          `DBConector: trying to connect to ${connectionOptions.name} connection in env ${process.env.NODE_ENV}`
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

  public static GetConnection() {
    const connectionManager = getConnectionManager();
    if (process.env.NODE_ENV && connectionManager.has(process.env.NODE_ENV)) {
      return getConnection(process.env.NODE_ENV);
    }
    if (connectionManager.has("development")) {
      return getConnection("development");
    }
    if (connectionManager.has("default")) {
      return getConnection();
    }
    throw Error(
      `DB Connection error: Don't exist database connection "${
        process.env.NODE_ENV && process.env.NODE_ENV !== "development"
          ? process.env.NODE_ENV + "|"
          : ""
      }development|default"`
    );
  }
}
