import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import ClientEntity from '../../database/entities/ClientEntity';
import { ErrorResponse, Response, SuccessResponse } from '../../models/responseModels/Response';
import * as _ from 'lodash'

@Service()
export class ClientDataService {

    @InjectRepository(ClientEntity, "development")
    private readonly _clientRepository: Repository<ClientEntity>



    all = async (criteria?: any): Promise<Response<ClientEntity[]>> => {
        const clients = await this._clientRepository.find({
            where: criteria
        })
        return SuccessResponse.Response(clients)
    }

    // all = async (criteria?: any, relations?: string[]): Promise<Response<UserEntity[]>> => {
    //     const users = await (await this._clientRepository.find({
    //         relations: relations,
    //         where: criteria
    //     }))
    //     return SuccessResponse.Response(users)
    // }

    one = async (criteria?: any): Promise<Response<ClientEntity>> => {
        const client = await this._clientRepository.findOne({
            where: criteria
        })
        if (_.isUndefined(client)) {
            return ErrorResponse.Response("Client not found")
        }
        return SuccessResponse.Response(client)
    }

    oneById = async (id: number): Promise<Response<ClientEntity>> => {
        if (_.isUndefined(id)) {
            return ErrorResponse.Response("Client not found", "id is undefined")
        }
        const client = await this._clientRepository.findOne(id)
        if (_.isUndefined(client)) {
            return ErrorResponse.Response("Client not found")
        }
        return SuccessResponse.Response(client)
    }


    create = async (client: ClientEntity): Promise<Response<ClientEntity>> => {
        const { name, lastName, sex, principalMail } = client

        if (_.isEmpty(name) || _.isEmpty(lastName) || _.isEmpty(sex) || _.isEmpty(principalMail)) {
            return ErrorResponse.Response('At least one of the basic params is empty')
        }

        try {
            const newClient = await this._clientRepository.save(client)
            if (_.isNull(newClient) || _.isUndefined(newClient)) {
                return ErrorResponse.Response('Error trying to create client')
            }
            return SuccessResponse.Response(newClient, 'Client created')

        } catch (error) {
            const { message } = error
            return ErrorResponse.Response('Error trying to create client', message ? message : '')
        }
    }


    update = async (client: ClientEntity): Promise<Response<ClientEntity>> => {
        try {
            const newClient = await this._clientRepository.save(client)
            return SuccessResponse.Response(newClient)
        } catch (error) {
            const { message } = error
            return ErrorResponse.Response("Error trying to update client ", message ? message : '')
        }
    }


    remove = async (id: number): Promise<Response<ClientEntity>> => {
        if (!_.isNumber(id)) {
            return ErrorResponse.Response('Error trying to remove client', 'Client id must be number')
        }
        const clientResp = await this.oneById(id)
        if (!clientResp.isSuccess || clientResp.result == null) {
            return ErrorResponse.Response('Error trying to remove client', 'Client not found')
        }
        try {
            const clientRemoved = await this._clientRepository.remove(clientResp.result)
            return SuccessResponse.Response(clientRemoved, "Client removed successfully")
        } catch (error) {
            const { message } = error
            return ErrorResponse.Response('Error trying to remove client', `Exception!: ${message ? error.message : ''} `)
        }
    }
}
