import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { RolEntity } from "../../database"
import { RoleRepository } from "../../database/repositories/RoleRepository"
import { SuccessResponse, Response, ErrorResponse } from '../../models/responseModels/Response'
import * as _ from 'lodash'

@Service()
export class RoleDataService {

    
    @InjectRepository(RolEntity, "development")
    private readonly _roleRepository: RoleRepository


    all = async (criteria?: any): Promise<Response<RolEntity[]>> => {
        const roles = await this._roleRepository.find({
            where: criteria
        })
        return SuccessResponse.Response(roles)
    }

    one = async (criteria?: any): Promise<Response<RolEntity>> => {
        const role = await this._roleRepository.findOne({
            where: criteria
        })
        return SuccessResponse.Response(role)
    }

    oneById = async (id: number): Promise<Response<RolEntity>> => {
        const role = await this._roleRepository.findOne(id)
        return SuccessResponse.Response(role)
    }

    create = async (role: RolEntity): Promise<Response<RolEntity>> => {
        const { name } = role

        if (_.isEmpty(name)) {
            return ErrorResponse.Response('Error trying to create role','Name param is empty')
        }

        let rolesCount = await this._roleRepository.findAndCount({
            where: { name }
        })

        if (rolesCount[1] > 0) {
            return ErrorResponse.Response('Error trying to create role',  'Role name already exist')
        }

        try {
            const newRole = await this._roleRepository.save(role)
            if (_.isUndefined(newRole) || _.isNull(newRole)) {
                return ErrorResponse.Response('Error trying to create role')
            }
            return SuccessResponse.Response(newRole,'Role created')
        } catch (error) {
            const { message } = error
            return ErrorResponse.Response('Error trying to create role', message ? message : '' )
        }
    }

    update = async (role: RolEntity): Promise<Response<RolEntity>> => {
        const { id, name } = role
       
        if (_.isEmpty(name)) {
            return ErrorResponse.Response('Error trying to update role', 'Name is empty')
        }

        const roleResponse = await this.oneById(id)
        if (!roleResponse.isSuccess) {
            return ErrorResponse.Response(`Error trying to update role','Role not found with id:${id}`)
        }
        const roleFound = roleResponse.result
        roleFound.name = name

        let rolesCount = await this._roleRepository.findAndCount({
            where: { name }
        })

        if (rolesCount[1] > 0) {
            return ErrorResponse.Response('Error trying to update role', 'Role name already exist')
        }

        try {
            const newRole = await this._roleRepository.save(roleFound)
            if (_.isUndefined(newRole) || _.isNull(newRole)) {
                return ErrorResponse.Response('Error trying to update role')
            }
            return SuccessResponse.Response(newRole, 'Role updated')
        } catch (error) {
            const { message } = error
            return ErrorResponse.Response('Error trying to update role', message ? message : '')
        }
    }

    remove = async (id: number): Promise<Response<RolEntity>> => {
        if (!_.isNumber(id)) {
            return ErrorResponse.Response('Error trying to remove role', 'Role id must be number')
        }
        const roleResp = await this.oneById(id)
        if (!roleResp.isSuccess || roleResp.result == null) {
            return ErrorResponse.Response('Error trying to remove role','Role not found')
        }
        try {
            const roleRemoved = await this._roleRepository.remove(roleResp.result)
            return SuccessResponse.Response(roleRemoved, "Role removed successfully")
        } catch (error) {
            const {message} = error
            return ErrorResponse.Response('Error trying to remove role', `Exception ${message? error.message:''} `)
        }
        
        
    }
}
