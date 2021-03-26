import {
  Connection,
  EntityRepository,
  FindOneOptions,
  Repository,
} from "typeorm";
import { RolEntity } from "@wisegar-org/wgo-opengar-core";
import { ConnectionService } from "../ConnectionService";
import { Service } from "typedi";

// @Service()
// class RoleRepositoryFactory {
//   constructor(public connectionService: ConnectionService) {}
//   async create() {
//     const connection = await this.connectionService.getConnection();
//     return new RoleRepository(connection);
//   }
// }
@Service()
@EntityRepository(RolEntity)
export class RoleRepository extends Repository<RolEntity> {
  // public entityRepository: Repository<RolEntity>;
  // constructor(connection: Connection) {
  //   this.entityRepository = connection.getRepository(RolEntity);
  // }
  // public findOne(id: number | string, options?: FindOneOptions) {
  //   this.entityRepository.findOne(id, options);
  // }
}
