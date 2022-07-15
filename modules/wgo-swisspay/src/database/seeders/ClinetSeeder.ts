import { IsNullOrUndefined } from '@wisegar-org/wgo-object-extensions';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../../../../wgo-base/authentication/database/entities/RoleEntity';
import { CLIENT_ROLE } from '../../models/constants';

export const roleClientSeeder = async (dataSource: DataSource) => {
  const roleRepository = dataSource.getRepository(RoleEntity);
  const clientRoleResult = await roleRepository.findOne({
    where: { name: CLIENT_ROLE },
  });
  if (IsNullOrUndefined(clientRoleResult)) {
    const clientRole = new RoleEntity();
    clientRole.name = CLIENT_ROLE;
    const adminRoleRegistered = await roleRepository.save(clientRole);
    if (!IsNullOrUndefined(adminRoleRegistered)) console.debug(`Client Role registered: ${adminRoleRegistered.name}`);
  }
};
