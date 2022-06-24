import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";
import { DataSource } from "typeorm";
import { SUPERADMIN } from "../../models";
import { RoleEntity } from "../entities/RoleEntity";
import { UserEntity } from "../entities/UserEntity";

export const userAdminSeeder = async (dataSource: DataSource) => {
  const adminUserEmail = "admin@wisegar.org";

  const userRepository = dataSource.getRepository(UserEntity);
  const roleRepository = dataSource.getRepository(RoleEntity);
  const adminUserResult = await userRepository.findOne({
    where: { email: adminUserEmail },
  });
  const roleEntity = await roleRepository.findOne({
    where: { name: SUPERADMIN },
  });
  if (IsNullOrUndefined(adminUserResult) || !adminUserResult) {
    const adminUser = new UserEntity();
    adminUser.email = adminUserEmail;
    adminUser.userName = adminUserEmail;
    adminUser.isEmailConfirmed = true;
    adminUser.name = "Admin";
    adminUser.lastName = "User";
    adminUser.password = "Wisegar.-0";
    adminUser.roles = roleEntity ? [roleEntity] : [];
    const adminUserRegistered = await userRepository.save(adminUser);
    if (!IsNullOrUndefined(adminUserRegistered))
      console.debug(`Admin User registered: ${adminUserRegistered.email}`);
    return;
  }

  if (!adminUserResult.roles) adminUserResult.roles = [];

  if (
    roleEntity &&
    adminUserResult.roles.findIndex((role) => role.name === roleEntity.name) ===
      -1
  ) {
    adminUserResult.roles.push(roleEntity);
    const userUpdated = await userRepository.save(adminUserResult);
    if (!IsNullOrUndefined(userUpdated))
      console.debug(`Admin User registered: ${userUpdated.email}`);
    return;
  }

  console.debug(`Admin User: ${adminUserResult.email}`);
};
