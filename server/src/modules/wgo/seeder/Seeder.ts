import { UserEntity, RolEntity, RolEntityEnum, UserDataService, LanguageService } from '@wisegar-org/wgo-opengar-core';
import _ from 'lodash';
import { Connection } from 'typeorm';
import { AGVRoles } from '../../agv/models';
import { UserModel } from '../models/UserModel';
import { IMetaProps, SeoModel } from '../modules';
import fs from 'fs-extra';
import { GetWebRootKey } from '../settings/ConfigService';
import { join, normalize } from 'path';

export class DataSeeder {
  connection: Connection;
  constructor(conn: Connection) {
    this.connection = conn;
  }

  /** TODO: PLEASE Store superuser schema on a json config file */
  public async createUserSeeder() {
    const userJSON = fs.readJsonSync(normalize(join(GetWebRootKey(), 'adminUserConfig.json')), { throws: false });

    const roleRepository = this.connection.getRepository(RolEntity);
    const userRepository = this.connection.getRepository(UserEntity);
    const _userDataSerive = new UserDataService(this.connection);

    const roleObj = await roleRepository.findOne({
      name: RolEntityEnum.admin,
    });
    const rolesList = [roleObj];
    let admin = await userRepository.findOne({
      userName: 'wisegar',
    });
    if (_.isEmpty(admin)) {
      let superAdmin = new UserEntity(
        userJSON?.name || 'Wisegar',
        userJSON?.lastName || 'Admin',
        userJSON?.userName || 'wisegar',
        userJSON?.email || 'info@wisegar.org',
        userJSON?.password || 'Wisegar.0',
        rolesList,
        true
      );
      try {
        const userSeedResult = await _userDataSerive.create(superAdmin, [roleObj.id]);
      } catch (error) {}
    }
  }

  /** TODO: PLEASE Store roles schema on a json config file */
  public async createRolesSeeder() {
    const roleRepository = this.connection.getRepository(RolEntity);
    const userRepository = this.connection.getRepository(UserEntity);
    //update superAdmin role if exist
    let roleObj = await roleRepository.findOne({
      name: 'superAdmin',
    });

    if (!_.isEmpty(roleObj)) {
      const adminRole = await roleRepository.findOne({
        name: RolEntityEnum.admin,
      });
      if (_.isEmpty(adminRole)) {
        roleObj.name = RolEntityEnum.admin;
        await roleRepository.save(roleObj);
      } else {
        const users = await userRepository.find({ relations: ['roles'] });
        for (const user of users) {
          const roles: RolEntity[] = [];
          for (const role of user.roles) {
            if (role.name === 'superAdmin') {
              roles.push(adminRole);
            } else {
              roles.push(role);
            }
          }
          user.roles = roles;
          await userRepository.save(user);
        }
        await roleRepository.remove(roleObj);
      }
    }
    roleObj = await roleRepository.findOne({
      name: RolEntityEnum.admin,
    });
    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = RolEntityEnum.admin;
      await roleRepository.save(userRole);
    }

    //update customer role if exist
    roleObj = await roleRepository.findOne({
      name: 'customer',
    });
    if (!_.isEmpty(roleObj)) {
      roleObj.name = RolEntityEnum.user;
      await roleRepository.save(roleObj);
    }
    roleObj = await roleRepository.findOne({
      name: RolEntityEnum.user,
    });

    if (_.isEmpty(roleObj)) {
      let userRole = new RolEntity();
      userRole.name = RolEntityEnum.user;
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
    const languages = await languageService.all();
    if (languages.length === 0) {
      await languageService.create({
        code: 'EN',
        default: true,
        enabled: true,
        logoId: 0,
        id: 0,
      });
    }
  }

  public async setSeoDataSeeder() {
    const seoModel = new SeoModel(this.connection);
    const seo = await seoModel.getSeoEntity();
    const meta = seo.meta;
    const defaultMetas = {
      title: { name: 'title', content: '' },
      description: { name: 'description', content: '' },
      keywords: { name: 'keywords', content: '' },
      robots: { name: 'robots', content: '' },
      'google-site-verification': { name: 'google-site-verification', content: '' },
      googlebot: { name: 'googlebot', content: '' },
      google: { name: 'google', content: '' },
      viewport: {
        name: 'viewport',
        content: 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width',
      },
      rating: { name: 'rating', content: '' },
      'og:locale': { property: 'og:locale', content: '' },
      'og:type': { property: 'og:type', content: '' },
      'og:title': { property: 'og:title', content: '' },
      'og:description': { property: 'og:description', content: '' },
      'og:url': { property: 'og:url', content: '' },
      'og:site_name': { property: 'og:site_name', content: '' },
      'og:image': { property: 'og:image', content: '' },
      'og:image:width': { property: 'og:image:width', content: '', type: 'number' },
      'og:image:height': { property: 'og:image:height', content: '', type: 'number' },
      'article:publisher': { property: 'article:publisher', content: '' },
      'article:modified_time': { property: 'article:modified_time', content: '' },
      'twitter:card': { name: 'twitter:card', content: '' },
      'twitter:image': { name: 'twitter:image', content: '' },
      'twitter:site': { name: 'twitter:site', content: '' },
      'twitter:label1': { name: 'twitter:label1', content: '' },
      'twitter:data1': { name: 'twitter:data1', content: '' },
    };

    const temp: { [key: string]: IMetaProps } = {};
    Object.keys(defaultMetas).forEach((key) => {
      if (key in seo.meta) {
        temp[key] = { ...defaultMetas[key], ...(seo.meta[key] as IMetaProps) };
      } else {
        temp[key] = defaultMetas[key];
      }
    });
    temp.viewport.content = temp.viewport.content ? temp.viewport.content : defaultMetas.viewport.content;
    seo.meta = temp;
    await seo.save();
    const iseo = await seoModel.getSeoData();
    await seoModel.setSeoInFile(iseo);
    await seoModel.setFaviconInFile(iseo.path);
  }

  public async registerTranslations() {
    const userModel = new UserModel(this.connection);
    await userModel.registerKeys();
  }

  public async createData() {
    await this.createRolesSeeder();
    await this.createUserSeeder();
    await this.createLanguageSeeder();
    await this.setSeoDataSeeder();
    await this.registerTranslations();
  }
}
