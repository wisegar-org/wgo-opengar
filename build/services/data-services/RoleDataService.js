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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDataService = void 0;
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const database_1 = require("../../database");
const RoleRepository_1 = require("../../database/repositories/RoleRepository");
const Response_1 = require("../../models/responseModels/Response");
const _ = __importStar(require("lodash"));
let RoleDataService = class RoleDataService {
    constructor() {
        this.all = async (criteria) => {
            const roles = await this._roleRepository.find({
                where: criteria,
            });
            return Response_1.SuccessResponse.Response(roles);
        };
        this.one = async (criteria) => {
            const role = await this._roleRepository.findOne({
                where: criteria,
            });
            return Response_1.SuccessResponse.Response(role);
        };
        this.oneById = async (id) => {
            const role = await this._roleRepository.findOne(id);
            return Response_1.SuccessResponse.Response(role);
        };
        this.create = async (role) => {
            const { name } = role;
            if (_.isEmpty(name)) {
                return Response_1.ErrorResponse.Response("Error trying to create role", "Name param is empty");
            }
            let rolesCount = await this._roleRepository.findAndCount({
                where: { name },
            });
            if (rolesCount[1] > 0) {
                return Response_1.ErrorResponse.Response("Error trying to create role", "Role name already exist");
            }
            try {
                const newRole = await this._roleRepository.save(role);
                if (_.isUndefined(newRole) || _.isNull(newRole)) {
                    return Response_1.ErrorResponse.Response("Error trying to create role");
                }
                return Response_1.SuccessResponse.Response(newRole, "Role created");
            }
            catch (error) {
                const { message } = error;
                return Response_1.ErrorResponse.Response("Error trying to create role", message ? message : "");
            }
        };
        this.update = async (role) => {
            const { id, name } = role;
            if (_.isEmpty(name)) {
                return Response_1.ErrorResponse.Response("Error trying to update role", "Name is empty");
            }
            const roleResponse = await this.oneById(id);
            if (!roleResponse.isSuccess) {
                return Response_1.ErrorResponse.Response(`Error trying to update role','Role not found with id:${id}`);
            }
            const roleFound = roleResponse.result;
            roleFound.name = name;
            let rolesCount = await this._roleRepository.findAndCount({
                where: { name },
            });
            if (rolesCount[1] > 0) {
                return Response_1.ErrorResponse.Response("Error trying to update role", "Role name already exist");
            }
            try {
                const newRole = await this._roleRepository.save(roleFound);
                if (_.isUndefined(newRole) || _.isNull(newRole)) {
                    return Response_1.ErrorResponse.Response("Error trying to update role");
                }
                return Response_1.SuccessResponse.Response(newRole, "Role updated");
            }
            catch (error) {
                const { message } = error;
                return Response_1.ErrorResponse.Response("Error trying to update role", message ? message : "");
            }
        };
        this.remove = async (id) => {
            if (!_.isNumber(id)) {
                return Response_1.ErrorResponse.Response("Error trying to remove role", "Role id must be number");
            }
            const roleResp = await this.oneById(id);
            if (!roleResp.isSuccess || roleResp.result == null) {
                return Response_1.ErrorResponse.Response("Error trying to remove role", "Role not found");
            }
            try {
                const roleRemoved = await this._roleRepository.remove(roleResp.result);
                return Response_1.SuccessResponse.Response(roleRemoved, "Role removed successfully");
            }
            catch (error) {
                const { message } = error;
                return Response_1.ErrorResponse.Response("Error trying to remove role", `Exception ${message ? error.message : ""} `);
            }
        };
    }
};
__decorate([
    typeorm_typedi_extensions_1.InjectRepository(database_1.RolEntity, "development"),
    __metadata("design:type", RoleRepository_1.RoleRepository)
], RoleDataService.prototype, "_roleRepository", void 0);
RoleDataService = __decorate([
    typedi_1.Service()
], RoleDataService);
exports.RoleDataService = RoleDataService;
//# sourceMappingURL=RoleDataService.js.map