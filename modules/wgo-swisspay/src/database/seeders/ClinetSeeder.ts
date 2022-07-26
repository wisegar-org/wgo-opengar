import { IsNullOrUndefined } from '@wisegar-org/wgo-object-extensions';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../../../../wgo-base/authentication/database/entities/RoleEntity';
import { CLIENT_ROLE, USER_ROLE } from '../../models/constants';

export const roleClientSeeder = async (dataSource: DataSource) => {
  const roleRepository = dataSource.getRepository(RoleEntity);
  const clientRoleResult = await roleRepository.findOne({
    where: { name: CLIENT_ROLE },
  });
  if (IsNullOrUndefined(clientRoleResult)) {
    const clientRole = new RoleEntity();
    clientRole.name = CLIENT_ROLE;
    const clientRoleRegistered = await roleRepository.save(clientRole);
    if (!IsNullOrUndefined(clientRoleRegistered)) console.debug(`Client Role registered: ${clientRoleRegistered.name}`);
  }
};

export const roleUserSeeder = async (dataSource: DataSource) => {
  const roleRepository = dataSource.getRepository(RoleEntity);
  const userRoleResult = await roleRepository.findOne({
    where: { name: USER_ROLE },
  });
  if (IsNullOrUndefined(userRoleResult)) {
    const userRole = new RoleEntity();
    userRole.name = USER_ROLE;
    const userRoleRegistered = await roleRepository.save(userRole);
    if (!IsNullOrUndefined(userRoleRegistered)) console.debug(`User Role registered: ${userRoleRegistered.name}`);
  }
};
