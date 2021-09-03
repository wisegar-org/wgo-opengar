import { RolEntity, UserDataService, UserEntity } from '@wisegar-org/wgo-opengar-core';
import _ from 'lodash';
import { Connection } from 'typeorm';
import { AGVRoles } from '../models';

export async function AddAdminUserSeeder(conn: Connection) {
  const roleRepository = conn.getRepository(RolEntity);
  const userRepository = conn.getRepository(UserEntity);
  const _userDataSerive = new UserDataService(conn);

  const roleAGV = await roleRepository.findOne({
    name: AGVRoles.Admin,
  });
  const rolesAGVList = [roleAGV];
  let adminAGV = await userRepository.findOne({
    userName: 'agvAdmin',
  });
  if (_.isEmpty(adminAGV)) {
    let superAdmin = new UserEntity(
      'AGV',
      'Admin',
      'agvAdmin',
      'assembleagenitorivezia@gmail.com',
      'agvAdmin.0',
      rolesAGVList,
      true
    );
    try {
      await _userDataSerive.create(superAdmin, [roleAGV.id]);
    } catch (error) {}
  }
}
