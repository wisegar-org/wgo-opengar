import { UserEntity, RolEntity, RolEntityEnum, UserDataService } from '@wisegar-org/wgo-opengar-core';
import _ from 'lodash';
import { Connection } from 'typeorm';
import { AGVRoles } from '../../agv/models';
import { SeoModel } from '../modules';
import { LanguageService } from '../services/LanguageService';

export class DataSeeder {
  connection: Connection;
  constructor(conn: Connection) {
    this.connection = conn;
  }

  /** TODO: PLEASE Store superuser schema on a json config file */
  public async createUserSeeder() {
    const roleRepository = this.connection.getRepository(RolEntity);
    const userRepository = this.connection.getRepository(UserEntity);
    const _userDataSerive = new UserDataService(this.connection);

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
    const roleRepository = this.connection.getRepository(RolEntity);
    const userRepository = this.connection.getRepository(UserEntity);
    let roleObj = await roleRepository.findOne({
      name: RolEntityEnum.superAdmin,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = RolEntityEnum.superAdmin;
      await roleRepository.save(userRole);
    }

    roleObj = await roleRepository.findOne({
      name: RolEntityEnum.customer,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = RolEntityEnum.customer;
      await roleRepository.save(userRole);
    }

    roleObj = await roleRepository.findOne({
      name: 'agvAdmin',
    });
    if (!!roleObj) {
      const role = await roleRepository.count({ where: { name: AGVRoles.Admin } });
      if (role > 0) {
        const user = await userRepository.findOne({ where: { userName: 'admin' } });
        await userRepository.manager.remove(user);
        await roleRepository.manager.remove(roleObj);
      } else {
        roleObj.name = AGVRoles.Admin;
        await roleRepository.save(roleObj);
      }
    }

    roleObj = await roleRepository.findOne({
      name: AGVRoles.Admin,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = AGVRoles.Admin;
      await roleRepository.save(userRole);
    }
  }

  public async createLanguageSeeder() {
    const languageService = new LanguageService(this.connection);
    await languageService.create({
      code: 'EN',
      default: false,
      enabled: true,
      logoId: 0,
      id: 0,
    });
  }

  public async setSeoDataSeeder() {
    const seoModel = new SeoModel(this.connection);
    const seo = await seoModel.getSeoData();
    await seoModel.setSeoInFile(seo);
  }

  public async createData() {
    await this.createRolesSeeder();
    await this.createUserSeeder();
    await this.createLanguageSeeder();
    await this.setSeoDataSeeder();
  }
}
