import { UserEntity, RolEntity, RolEntityEnum, UserDataService } from '@wisegar-org/wgo-opengar-core';
import _ from 'lodash';
import { Connection, Repository } from 'typeorm';
import { AGVRoles } from '../../agv/models';
import { GetConnection } from '../database';

export class DataSeeder {
  _userDataSerive: UserDataService;
  userRepository: Repository<UserEntity>;
  roleRepository: Repository<RolEntity>;
  connection: Connection;
  constructor(conn: Connection) {
    this.connection = conn;
    this.userRepository = this.connection.getRepository(UserEntity);
    this.roleRepository = this.connection.getRepository(RolEntity);
    this._userDataSerive = new UserDataService(this.connection);
  }

  /** TODO: PLEASE Store superuser schema on a json config file */
  public async createUserSeeder() {
    const connection = GetConnection();
    const roleRepository = connection.getRepository(RolEntity);
    const userRepository = connection.getRepository(UserEntity);
    const _userDataSerive = new UserDataService(connection);

    const roleObj = await roleRepository.findOne({
      name: RolEntityEnum.superAdmin,
    });
    const rolesList = [roleObj];
    let admin = await userRepository.findOne({
      userName: 'wisegar',
    });
    if (_.isEmpty(admin)) {
      let superAdmin = new UserEntity('Wisegar', 'Admin', 'wisegar', 'info@wisegar.org', 'Wisegar.0', rolesList, true);
      try {
        const userSeedResult = await _userDataSerive.create(superAdmin, [roleObj.id]);
      } catch (error) {}
    }
  }

  /** TODO: PLEASE Store roles schema on a json config file */
  public async createRolesSeeder() {
    const connection = GetConnection();
    const roleRepository = connection.getRepository(RolEntity);
    const userRepository = connection.getRepository(UserEntity);

    let roleObj = await this.roleRepository.findOne({
      name: RolEntityEnum.superAdmin,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = RolEntityEnum.superAdmin;
      await this.roleRepository.save(userRole);
    }

    roleObj = await this.roleRepository.findOne({
      name: RolEntityEnum.customer,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = RolEntityEnum.customer;
      await this.roleRepository.save(userRole);
    }

    roleObj = await this.roleRepository.findOne({
      name: AGVRoles.Admin,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = AGVRoles.Admin;
      await this.roleRepository.save(userRole);
    }
  }

  public async createData() {
    await this.createRolesSeeder();
    await this.createUserSeeder();
  }
}
