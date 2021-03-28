import { UserEntity, RolEntity, RolEntityEnum, UserDataService } from "@wisegar-org/wgo-opengar-core";
import * as _ from "lodash";
import { Inject, Service } from "typedi";
import { Connection, Repository } from 'typeorm';

@Service()
export class DataSeeder {
  _userDataSerive: UserDataService
  userRepository: Repository<UserEntity>
  roleRepository: Repository<RolEntity>
  connection: Connection
  constructor(
  ) {
  }

  /** TODO: PLEASE Store superuser schema on a json config file */
  public async createUserSeeder() {
    const roleObj = await this.roleRepository.findOne({
      id: RolEntityEnum.superAdmin,
    });
    const rolesList = [roleObj];
    let admin = await this.userRepository.findOne({
      userName: "wisegar",
    });
    if (_.isEmpty(admin)) {
      let superAdmin = new UserEntity(
        "Wisegar",
        "Admin",
        "wisegar",
        "info@wisegar.org",
        "Wisegar.0",
        rolesList,
        true
      );
      try {
        const userSeedResult = await this._userDataSerive.create(superAdmin, [
          RolEntityEnum.superAdmin,
        ]);
      } catch (error) {}
    }
  }

  /** TODO: PLEASE Store roles schema on a json config file */
  public async createRolesSeeder() {
    let roleObj = await this.roleRepository.findOne({
      id: RolEntityEnum.superAdmin,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity("superAdmin", 1);
      await this.roleRepository.save(userRole);
    }

    roleObj = await this.roleRepository.findOne({
      id: RolEntityEnum.customer,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity("customer", 2);
      await this.roleRepository.save(userRole);
    }
  }

  init = async (conn: Connection) => {
    this.connection = conn
    this.userRepository = this.connection.getRepository(UserEntity)
    this.roleRepository = this.connection.getRepository(RolEntity)
    this._userDataSerive = new UserDataService(conn)
    await this.createRolesSeeder();
    await this.createUserSeeder();
  };
}
