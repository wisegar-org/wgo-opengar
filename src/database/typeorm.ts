import { createConnection, Connection } from 'typeorm'
export { Connection, Repository } from 'typeorm'
import _ from 'lodash'
import { InjectConnection } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

@Service()
export class DBConector {
    @InjectConnection()
    private _connection: Connection;
    
    static connect = async (connectionName?: string | undefined): Promise<Connection> => {
        return !_.isEmpty(connectionName) || !_.isUndefined(connectionName) ? await createConnection(connectionName) : await createConnection()
    }
}
