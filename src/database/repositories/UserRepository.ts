import { Inject, Service } from "typedi";
import {
  Connection,
  EntityRepository,
  FindOneOptions,
  Repository,
  RepositoryNotFoundError,
} from "typeorm";
import { UserEntity } from "@wisegar-org/wgo-opengar-core";
import { ConnectionService } from "../ConnectionService";
import { extend } from "lodash";

// @Service()
// class UserRepositoryFactory {
//   constructor(public connectionService: ConnectionService) {}
//   async create() {
//     debugger;
//     let connection;
//     try {
//       connection = await this.connectionService.getConnection();
//     } catch (e) {
//       debugger;
//     }

//     return new UserRepository(connection);
//   }
// }
@Service()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
