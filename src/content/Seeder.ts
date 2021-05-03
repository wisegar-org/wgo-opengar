import {
  UserEntity,
  RolEntity,
  RolEntityEnum,
  UserDataService,
} from "@wisegar-org/wgo-opengar-core";
import * as _ from "lodash";
import { Service } from "typedi";
import { Connection, Repository } from "typeorm";
import { DBConector } from "../database/DBConector";

@Service()
export class DataSeeder {
  _userDataSerive: UserDataService;
  userRepository: Repository<UserEntity>;
  roleRepository: Repository<RolEntity>;
  connection: Connection;
  constructor() {
    this.connection = DBConector.GetConnection();
    this.userRepository = this.connection.getRepository(UserEntity);
    this.roleRepository = this.connection.getRepository(RolEntity);
    this._userDataSerive = new UserDataService(this.connection);
  }

  /** TODO: PLEASE Store superuser schema on a json config file */
  public async createUserSeeder() {
    const connection = DBConector.GetConnection();
    const roleRepository = connection.getRepository(RolEntity);
    const userRepository = connection.getRepository(UserEntity);

    const roleObj = await roleRepository.findOne({
      id: RolEntityEnum.superAdmin,
    });
    const rolesList = [roleObj];
    let admin = await userRepository.findOne({
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
        const _userDataSerive = new UserDataService(connection);
        const userSeedResult = await _userDataSerive.create(superAdmin, [
          RolEntityEnum.superAdmin,
        ]);
      } catch (error) {}
    }
  }

  /** TODO: PLEASE Store roles schema on a json config file */
  public async createRolesSeeder() {
    const connection = DBConector.GetConnection();
    const roleRepository = connection.getRepository(RolEntity);
    const userRepository = connection.getRepository(UserEntity);

    let roleObj = await this.roleRepository.findOne({
      id: RolEntityEnum.superAdmin,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = "superAdmin";
      await this.roleRepository.save(userRole);
    }

    roleObj = await this.roleRepository.findOne({
      id: RolEntityEnum.customer,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = "customer";
      await this.roleRepository.save(userRole);
    }
  }

  public async createData() {
    await this.createRolesSeeder();
    await this.createUserSeeder();
  }
}
