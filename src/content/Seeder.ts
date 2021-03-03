import { UserEntity, RolEntity, Repository } from '../database/index';
import { RolEntityEnum } from '../models/index'
import * as _ from 'lodash'
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../database/repositories/UserRepository';
import { RoleRepository } from '../database/repositories/RoleRepository';

@Service()
export class DataSeeder {

    constructor(
        @InjectRepository(UserEntity, "development") private readonly userRepository: UserRepository,
        @InjectRepository(RolEntity, "development") private readonly roleRepository: RoleRepository) {
    }

    createUserSeeder = async () => {
        const roleObj = await this.roleRepository.findOne({
            id: RolEntityEnum.superAdmin
        })
        const rolesList = [roleObj]
        let admin = await this.userRepository.findOne({
            userName: 'wisegar'
        })

        if (_.isEmpty(admin)) {
            let superAdmin = new UserEntity(
                'Wisegar',
                'Admin',
                'wisegar',
                'info@wisegar.org',
                'Wisegar.0',
                rolesList,
                true)
            await this.userRepository.save(superAdmin);
        }
    }

    createRolesSeeder = async () => {
        let roleObj = await this.roleRepository.findOne({
            id: RolEntityEnum.superAdmin
        })

        if (_.isEmpty(roleObj)) {
            let userRole = new RolEntity('superAdmin', 1);
            await this.roleRepository.save(userRole)
        }

        roleObj = await this.roleRepository.findOne({
            id: RolEntityEnum.customer
        })

        if (_.isEmpty(roleObj)) {
            let userRole = new RolEntity('customer', 2);
            await this.roleRepository.save(userRole)
        }
    }

    init = async () => {
        await this.createRolesSeeder()
        await this.createUserSeeder()
    }

}

