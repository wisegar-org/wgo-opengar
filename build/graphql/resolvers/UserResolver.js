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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
const UserResponsesGQL_1 = require("../types/responses/UserResponsesGQL");
const Response_1 = require("../../models/responseModels/Response");
const UserInputsGQL_1 = require("../types/inputs/UserInputsGQL");
const _ = __importStar(require("lodash"));
const typedi_1 = require("typedi");
const typedi_2 = __importDefault(require("typedi"));
let UserResolver = class UserResolver {
    constructor() {
        const conn = typedi_2.default.get('connection');
        this._userDataSerive = new wgo_opengar_core_1.UserDataService(conn);
    }
    async users(criteria) {
        return await this._userDataSerive.all(criteria);
    }
    async user(criteria) {
        return await this._userDataSerive.one(criteria);
    }
    async userById(id) {
        return await this._userDataSerive.oneById(id);
    }
    async userByUuid(uuid) {
        return await this._userDataSerive.oneByUuId(uuid);
    }
    //In roles arg we have the roleIds we want to set to the user we are creating
    async addUser({ name, lastName, email, userName, password, roles }) {
        const user = new wgo_opengar_core_1.UserEntity();
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.userName = userName;
        user.password = password;
        const registerResponse = await this._userDataSerive.create(user);
        if (registerResponse.isSuccess) {
            const uuid = registerResponse.result.uuid;
            const result = await this._userDataSerive.setUserRoles(uuid, roles);
            if (result.isSuccess) {
                return registerResponse;
            }
            return Response_1.ErrorResponse.Response("Error adding roles to user but user was created");
        }
        return Response_1.ErrorResponse.Response("Error creating user");
    }
    async setRoles({ userUuid, roleIds }) {
        return this._userDataSerive.setUserRoles(userUuid, roleIds);
    }
    async login(data) {
        return this._userDataSerive.login(data);
    }
    async updateUser({ id, name, lastName, email, userName, roles }) {
        const userResponse = await this.userById(id);
        if (!userResponse.isSuccess) {
            return Response_1.ErrorResponse.Response(`Error trying to update user.User not found with id:${id}`);
        }
        const user = userResponse.result;
        user.name = name ? name : user.name;
        user.lastName = lastName ? lastName : user.lastName;
        user.email = email ? email : user.email;
        user.userName = userName ? userName : user.userName;
        const updateResp = await this._userDataSerive.update(user);
        if (!updateResp.isSuccess) {
            return Response_1.ErrorResponse.Response(`Error trying to update user.`);
        }
        if (_.isUndefined(roles) || !_.isArray(roles)) {
            return updateResp;
        }
        return await this._userDataSerive.setUserRoles(user.uuid, roles);
    }
    async removeUser(uuid) {
        return await this._userDataSerive.remove(uuid);
    }
};
__decorate([
    type_graphql_1.Query(() => UserResponsesGQL_1.UserListResponseGQL),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputsGQL_1.UserFilterArgs]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => UserResponsesGQL_1.UserResponseGQL),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputsGQL_1.UserFilterArgs]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(() => UserResponsesGQL_1.UserResponseGQL),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userById", null);
__decorate([
    type_graphql_1.Query(() => UserResponsesGQL_1.UserResponseGQL),
    __param(0, type_graphql_1.Arg("uuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByUuid", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponsesGQL_1.UserResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputsGQL_1.UserInputGQL]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponsesGQL_1.UserResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputsGQL_1.UserRolesInputGQL]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "setRoles", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponsesGQL_1.UserLoginResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputsGQL_1.LoginModelInputGQL]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponsesGQL_1.UserResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputsGQL_1.UserInputGQL]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponsesGQL_1.UserResponseGQL),
    __param(0, type_graphql_1.Arg("uuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removeUser", null);
UserResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(),
    __metadata("design:paramtypes", [])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map