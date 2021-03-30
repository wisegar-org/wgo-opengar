"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDataService = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ClientEntity_1 = __importDefault(require("../../database/entities/ClientEntity"));
const Response_1 = require("../../models/responseModels/Response");
const _ = __importStar(require("lodash"));
let ClientDataService = class ClientDataService {
    constructor() {
        this.all = async (criteria) => {
            const clients = await this._clientRepository.find({
                where: criteria
            });
            return Response_1.SuccessResponse.Response(clients);
        };
        // all = async (criteria?: any, relations?: string[]): Promise<Response<UserEntity[]>> => {
        //     const users = await (await this._clientRepository.find({
        //         relations: relations,
        //         where: criteria
        //     }))
        //     return SuccessResponse.Response(users)
        // }
        this.one = async (criteria) => {
            const client = await this._clientRepository.findOne({
                where: criteria
            });
            if (_.isUndefined(client)) {
                return Response_1.ErrorResponse.Response("Client not found");
            }
            return Response_1.SuccessResponse.Response(client);
        };
        this.oneById = async (id) => {
            if (_.isUndefined(id)) {
                return Response_1.ErrorResponse.Response("Client not found", "id is undefined");
            }
            const client = await this._clientRepository.findOne(id);
            if (_.isUndefined(client)) {
                return Response_1.ErrorResponse.Response("Client not found");
            }
            return Response_1.SuccessResponse.Response(client);
        };
        this.create = async (client) => {
            const { name, lastName, sex, principalMail } = client;
            if (_.isEmpty(name) || _.isEmpty(lastName) || _.isEmpty(sex) || _.isEmpty(principalMail)) {
                return Response_1.ErrorResponse.Response('At least one of the basic params is empty');
            }
            try {
                const newClient = await this._clientRepository.save(client);
                if (_.isNull(newClient) || _.isUndefined(newClient)) {
                    return Response_1.ErrorResponse.Response('Error trying to create client');
                }
                return Response_1.SuccessResponse.Response(newClient, 'Client created');
            }
            catch (error) {
                const { message } = error;
                return Response_1.ErrorResponse.Response('Error trying to create client', message ? message : '');
            }
        };
        this.update = async (client) => {
            try {
                const newClient = await this._clientRepository.save(client);
                return Response_1.SuccessResponse.Response(newClient);
            }
            catch (error) {
                const { message } = error;
                return Response_1.ErrorResponse.Response("Error trying to update client ", message ? message : '');
            }
        };
        this.remove = async (id) => {
            if (!_.isNumber(id)) {
                return Response_1.ErrorResponse.Response('Error trying to remove client', 'Client id must be number');
            }
            const clientResp = await this.oneById(id);
            if (!clientResp.isSuccess || clientResp.result == null) {
                return Response_1.ErrorResponse.Response('Error trying to remove client', 'Client not found');
            }
            try {
                const clientRemoved = await this._clientRepository.remove(clientResp.result);
                return Response_1.SuccessResponse.Response(clientRemoved, "Client removed successfully");
            }
            catch (error) {
                const { message } = error;
                return Response_1.ErrorResponse.Response('Error trying to remove client', `Exception!: ${message ? error.message : ''} `);
            }
        };
    }
};
__decorate([
    typeorm_typedi_extensions_1.InjectRepository(ClientEntity_1.default, "development"),
    __metadata("design:type", typeorm_1.Repository)
], ClientDataService.prototype, "_clientRepository", void 0);
ClientDataService = __decorate([
    typedi_1.Service()
], ClientDataService);
exports.ClientDataService = ClientDataService;
//# sourceMappingURL=ClientDataService.js.map