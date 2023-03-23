import { getConnection, getConnectionManager } from 'typeorm';
export { Connection, Repository } from 'typeorm';
import _ from 'lodash';
import { GetNodeEnvKey } from '@wisegar-org/wgo-settings';

export function GetConnection() {
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
