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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = __importStar(require("typedi"));
const RoleDataService_1 = require("../../services/data-services/RoleDataService");
const RoleInputGQL_1 = require("../types/inputs/RoleInputGQL");
const RoleResponseGQL_1 = require("../types/responses/RoleResponseGQL");
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
let RoleResolver = class RoleResolver {
    constructor() {
        this._roleDataSerive = typedi_1.default.get(RoleDataService_1.RoleDataService);
    }
    async roles(criteria) {
        return await this._roleDataSerive.all(criteria);
    }
    async role(criteria) {
        return await this._roleDataSerive.one(criteria);
    }
    async roleById(id) {
        return await this._roleDataSerive.oneById(id);
    }
    async addRole({ name }) {
        const role = new wgo_opengar_core_1.RolEntity(name);
        return await this._roleDataSerive.create(role);
    }
    async updateRole({ id, name }) {
        return await this._roleDataSerive.update({ id, name });
    }
    async removeRole(id) {
        return await this._roleDataSerive.remove(id);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", RoleDataService_1.RoleDataService)
], RoleResolver.prototype, "_roleDataSerive", void 0);
__decorate([
    type_graphql_1.Query(() => RoleResponseGQL_1.RoleListResponseGQL),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoleInputGQL_1.RoleFilterArgs]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "roles", null);
__decorate([
    type_graphql_1.Query(() => RoleResponseGQL_1.RoleResponseGQL),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoleInputGQL_1.RoleFilterArgs]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "role", null);
__decorate([
    type_graphql_1.Query(() => RoleResponseGQL_1.RoleResponseGQL),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "roleById", null);
__decorate([
    type_graphql_1.Mutation(() => RoleResponseGQL_1.RoleResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoleInputGQL_1.RoleInputGQL]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "addRole", null);
__decorate([
    type_graphql_1.Mutation(() => RoleResponseGQL_1.RoleResponseGQL),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoleInputGQL_1.RoleInputGQL]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "updateRole", null);
__decorate([
    type_graphql_1.Mutation(() => RoleResponseGQL_1.RoleResponseGQL),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "removeRole", null);
RoleResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(),
    __metadata("design:paramtypes", [])
], RoleResolver);
exports.RoleResolver = RoleResolver;
//# sourceMappingURL=RoleResolver.js.map