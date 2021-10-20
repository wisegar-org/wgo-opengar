import { UserEntity, RolEntity, RolEntityEnum, UserDataService, LanguageService } from '@wisegar-org/wgo-opengar-core';
import _ from 'lodash';
import { Connection } from 'typeorm';
import { AGVRoles } from '../../agv/models';
import { IMetaProps, SeoModel } from '../modules';

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
      viewport: { name: 'viewport', content: '' },
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
    seo.meta = temp;
    await seo.save();
    const iseo = await seoModel.getSeoData();
    await seoModel.setSeoInFile(iseo);
    await seoModel.setFaviconInFile(iseo.path);
  }

  public async createData() {
    await this.createRolesSeeder();
    await this.createUserSeeder();
    await this.createLanguageSeeder();
    await this.setSeoDataSeeder();
  }
}
