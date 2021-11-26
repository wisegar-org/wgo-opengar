import { createConnection, Connection, ConnectionOptions, getConnectionManager, getConnection } from 'typeorm'

export const InitializeConnection = async (connecetionOptions: ConnectionOptions): Promise<Connection> => {
  console.log('Create Github connection')
  const connection = await createConnection(connecetionOptions)
  return connection
}

export const RegisterConnection = (conn: Connection): void => {
  console.log('Register Github connection')
  const connectionManager = getConnectionManager()
  connectionManager.connections.push(conn)
}

export const GetConnection = (name?: string): Connection => {
  const connectionManager = getConnectionManager()
  if (name && connectionManager.has(name)) {
    return getConnection(name)
  }
  if (process.env.NODE_ENV && connectionManager.has(process.env.NODE_ENV)) {
    return getConnection(process.env.NODE_ENV)
  }
  if (connectionManager.has('default')) {
    return getConnection()
  }
  if (connectionManager.connections.length > 0) {
    return connectionManager.connections[0]
  }
  throw Error(`DB Connection error: Don't exist database connection "${name || 'default'}"`)
}
