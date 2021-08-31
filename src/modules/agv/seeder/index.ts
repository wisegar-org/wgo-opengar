import { RolEntity, UserDataService, UserEntity } from '@wisegar-org/wgo-opengar-core';
import _ from 'lodash';
import { DBConector } from '../../../database/DBConector';
import { AGVRoles } from '../models';

export const SedderAGV = async () => {
  const connection = DBConector.GetConnection();
  const roleRepository = connection.getRepository(RolEntity);
  const userRepository = connection.getRepository(UserEntity);
  const _userDataSerive = new UserDataService(connection);

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
};
