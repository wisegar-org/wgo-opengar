import { Connection } from 'typeorm';
import CollaboratorEntity from '../database/entities/CollaboratorEntity';
import AccountEntity from '../database/entities/AccountEntity';
import { RolEntity, RolEntityEnum, UserDataService, UserEntity } from '@wisegar-org/wgo-opengar-core';
import _ from 'lodash';

export async function CheckCollaboratosId(conn: Connection) {
  const collaboratorConnection = conn.getRepository(CollaboratorEntity);

  const collaborators = await collaboratorConnection.find({
    where: {
      isCollaborator: true,
    },
  });

  await Promise.all(
    collaborators.map(async (coll) => {
      if (coll.id_github === 0) {
        coll.id_github = coll.id;
        await collaboratorConnection.manager.save(coll);
      }
    })
  );

  return true;
}

export async function SetAccountingValue(conn: Connection) {
  const accountingConnection = conn.getRepository(AccountEntity);

  const accounting = await accountingConnection.find({});

  await Promise.all(
    accounting.map(async (acc) => {
      if (acc.value === 0) {
        acc.value = acc.getTotalToPay();
        await accountingConnection.manager.save(acc);
      }
    })
  );

  return true;
}

export async function fixUserAdminTemplate(conn: Connection, add: boolean = false) {
  const roleRepository = conn.getRepository(RolEntity);
  const userRepository = conn.getRepository(UserEntity);
  const _userDataSerive = new UserDataService(conn);
  const roleObj = await roleRepository.findOne({
    name: RolEntityEnum.superAdmin,
  });
  const rolesList = [roleObj];
  let admin = await userRepository.findOne({
    userName: 'wisegar2',
  });
  if (_.isEmpty(admin) && add) {
    let superAdmin = new UserEntity('Wisegar2', 'Admin', 'wisegar2', 'info2@wisegar.org', 'Wisegar.0', rolesList, true);
    try {
      const userSeedResult = await _userDataSerive.create(superAdmin, [roleObj.id]);
    } catch (error) {}
  }

  if (!add && admin) {
    await _userDataSerive.remove(admin.uuid);
  }
}
