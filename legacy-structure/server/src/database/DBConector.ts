import { createConnection, Connection, ConnectionOptions, getConnection, getConnectionManager } from 'typeorm';
export { Connection, Repository } from 'typeorm';
import _ from 'lodash';
import { GetNodeEnvKey } from '@wisegar-org/wgo-settings';
import { BuildSettings } from '../settings/BuildSettings';
import { getConnectionOptions, OGConnection } from './DBConnections';

export class DBConector {
  private _connection: Connection;

  /**
   * Get the typeorm connection options
   * @param connection OGConnection enum value
   * @returns If no params return development connection. Environment enum returns the corrispondent OGConnection.
   */
  private static async GetConnectionOptions(
    buildConfig: BuildSettings,
    connection?: OGConnection
  ): Promise<ConnectionOptions> {
    if (
      GetNodeEnvKey() &&
      (GetNodeEnvKey() === 'development' || GetNodeEnvKey() === 'staging' || GetNodeEnvKey() === 'production')
    ) {
      return getConnectionOptions(buildConfig);
    } else {
      throw Error(
        "No valid environment value was found on '.env' file. Impossible to determinate a connection options value to return."
      );
    }
  }

  public static async Connect(buildConfig: BuildSettings, connectionType?: OGConnection): Promise<Connection> {
    const connectionOptions = await DBConector.GetConnectionOptions(buildConfig, connectionType);
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
}
