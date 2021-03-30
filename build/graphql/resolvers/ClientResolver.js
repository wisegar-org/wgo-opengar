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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = __importStar(require("typedi"));
const ClientDataService_1 = require("../../services/data-services/ClientDataService");
const ClientResponseGQL_1 = require("../types/responses/ClientResponseGQL");
const ClientInputGQL_1 = require("../types/inputs/ClientInputGQL");
const ClientEntity_1 = __importDefault(require("../../database/entities/ClientEntity"));
let ClientResolver = class ClientResolver {
    constructor() {
        this._clientDataService = typedi_1.default.get(ClientDataService_1.ClientDataService);
    }
    async clients(criteria) {
        return await this._clientDataService.all(criteria);
    }
    async client(criteria) {
        return await this._clientDataService.one(criteria);
    }
    async clientById(id) {
        return await this._clientDataService.oneById(id);
    }
    async addClient({ name, lastName, sex, birthDate, civilStatus, principalAddress, principalCap, principalCity, principalMail, principalPhone, secundaryAddress, secundaryCap, secundaryCity, secundaryMail, secundaryPhone, }) {
        const client = new ClientEntity_1.default(name, lastName, birthDate, sex, civilStatus);
        client.setPrincipalInfo(principalAddress, principalCap, principalCity, principalMail, principalPhone);
        client.setSecondaryInfo(secundaryAddress, secundaryCap, secundaryCity, secundaryMail, secundaryPhone);
        return await this._clientDataService.create(client);
    }
    async updateClient({ id, name, lastName, sex, birthDate, civilStatus, principalAddress, principalCap, principalCity, principalMail, principalPhone, secundaryAddress, secundaryCap, secundaryCity, secundaryMail, secundaryPhone, }) {
        const clientResponse = await this.clientById(id);
        if (!clientResponse.isSuccess) {
            return clientResponse;
        }
        const client = clientResponse.result;
        client.name = name ? name : client.name;
        client.lastName = lastName ? lastName : client.lastName;
        client.sex = sex ? sex : client.sex;
        client.birthDate = birthDate ? birthDate : client.birthDate;
        client.civilStatus = civilStatus ? civilStatus : client.civilStatus;
        client.principalAddress = principalAddress
            ? principalAddress
            : client.principalAddress;
        client.principalCap = principalCap ? principalCap : client.principalCap;
        client.principalCity = principalCity ? principalCity : client.principalCity;
        client.principalMail = principalMail ? principalMail : client.principalMail;
        client.principalPhone = principalPhone
            ? principalPhone
            : client.principalPhone;
        client.secundaryAddress = secundaryAddress
            ? secundaryAddress
            : client.secundaryAddress;
        client.secundaryCap = secundaryCap ? secundaryCap : client.secundaryCap;
        client.secundaryCity = secundaryCity ? secundaryCity : client.secundaryCity;
        client.secundaryMail = secundaryMail ? secundaryMail : client.secundaryMail;
        client.secundaryPhone = secundaryPhone
            ? secundaryPhone
            : client.secundaryPhone;
        return await this._clientDataService.update(client);
    }
    async removeClient(id) {
        return await this._clientDataService.remove(id);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", ClientDataService_1.ClientDataService)
], ClientResolver.prototype, "_clientDataService", void 0);
__decorate([
    type_graphql_1.Query(() => ClientResponseGQL_1.ClientListResponseGQL),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientInputGQL_1.ClientFilterArgs]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "clients", null);
__decorate([
    type_graphql_1.Query(() => ClientResponseGQL_1.ClientResponseGQL),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientInputGQL_1.ClientFilterArgs]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "client", null);
__decorate([
    type_graphql_1.Query(() => ClientResponseGQL_1.ClientResponseGQL),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "clientById", null);
__decorate([
    type_graphql_1.Mutation(() => ClientResponseGQL_1.ClientResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientInputGQL_1.ClientInputGQL]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "addClient", null);
__decorate([
    type_graphql_1.Mutation(() => ClientResponseGQL_1.ClientResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientInputGQL_1.ClientInputGQL]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "updateClient", null);
__decorate([
    type_graphql_1.Mutation(() => ClientResponseGQL_1.ClientResponseGQL),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "removeClient", null);
ClientResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(),
    __metadata("design:paramtypes", [])
], ClientResolver);
exports.ClientResolver = ClientResolver;
//# sourceMappingURL=ClientResolver.js.map