import { createConnection, Connection, ConnectionOptions, getConnection, getConnectionManager } from 'typeorm';
export { Connection, Repository } from 'typeorm';
import _ from 'lodash';
import { OGConnection, getConnectionOptions } from './DBConnections';
import { GetNodeEnvKey } from '@wisegar-org/wgo-opengar-core';

export class DBConector {
  private _connection: Connection;

  /**
   * Get the typeorm connection options
   * @param connection OGConnection enum value
   * @returns If no params return development connection. Environment enum returns the corrispondent OGConnection.
   */
  private static async GetConnectionOptions(connection?: OGConnection): Promise<ConnectionOptions> {
    if (
      GetNodeEnvKey() &&
      (GetNodeEnvKey() === 'development' || GetNodeEnvKey() === 'staging' || GetNodeEnvKey() === 'production')
    ) {
      return getConnectionOptions();
    } else {
      throw Error(
        "No valid environment value was found on '.env' file. Impossible to determinate a connection options value to return."
      );
    }
  }

  public static async Connect(connectionType?: OGConnection): Promise<Connection> {
    const connectionOptions = await DBConector.GetConnectionOptions(connectionType);
    let connection: Connection;
    try {
      if (!_.isUndefined(connectionOptions)) {
        console.log(
          `DBConector: trying to connect to ${connectionOptions.database} database in env ${GetNodeEnvKey()}`
        );
        connection = await createConnection(connectionOptions);
      } else {
        throw 'DBConector: Impossible to retrieve a valid connection options';
      }
    } catch (error) {
      throw `DBConector connect. Error: ${error.message}`;
    }
    if (connection) console.log(`DBConector: connection successfully stabilished`);
    return connection;
  }

  public static GetConnection() {
    const connectionManager = getConnectionManager();
    if (GetNodeEnvKey() && connectionManager.has(GetNodeEnvKey())) {
      return getConnection(GetNodeEnvKey());
    }
    if (connectionManager.has('development')) {
      return getConnection('development');
    }
    if (connectionManager.has('default')) {
      return getConnection();
    }
    if (connectionManager.connections.length > 0) {
      return connectionManager.connections[0];
    }
    throw Error(
      `DB Connection error: Don't exist database connection "${
        GetNodeEnvKey() && GetNodeEnvKey() !== 'development' ? GetNodeEnvKey() + '|' : ''
      }development|default"`
    );
  }
}
