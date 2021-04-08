"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesResponse = exports.RoleResponse = exports.UserLoginResponseGQL = exports.UserListResponseGQL = exports.UserResponseGQL = exports.UserLoginToken = exports.UserGQL = void 0;
const type_graphql_1 = require("type-graphql");
const RoleInputGQL_1 = require("../inputs/RoleInputGQL");
const ResponseGQL_1 = require("./ResponseGQL");
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
let UserGQL = class UserGQL {
};
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], UserGQL.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserGQL.prototype, "uuid", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserGQL.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserGQL.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserGQL.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserGQL.prototype, "userName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], UserGQL.prototype, "isEmailConfirmed", void 0);
__decorate([
    type_graphql_1.Field(() => [RoleInputGQL_1.RoleGQL]),
    __metadata("design:type", Array)
], UserGQL.prototype, "roles", void 0);
UserGQL = __decorate([
    type_graphql_1.ObjectType()
], UserGQL);
exports.UserGQL = UserGQL;
let UserLoginToken = class UserLoginToken {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserLoginToken.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(() => UserGQL),
    __metadata("design:type", typeof (_a = typeof wgo_opengar_core_1.UserEntity !== "undefined" && wgo_opengar_core_1.UserEntity) === "function" ? _a : Object)
], UserLoginToken.prototype, "user", void 0);
UserLoginToken = __decorate([
    type_graphql_1.ObjectType()
], UserLoginToken);
exports.UserLoginToken = UserLoginToken;
let UserResponseGQL = class UserResponseGQL extends ResponseGQL_1.GenericResponseGQL(UserGQL) {
};
UserResponseGQL = __decorate([
    type_graphql_1.ObjectType()
], UserResponseGQL);
exports.UserResponseGQL = UserResponseGQL;
let UserListResponseGQL = class UserListResponseGQL extends ResponseGQL_1.GenericArrayResponseGQL(UserGQL) {
};
UserListResponseGQL = __decorate([
    type_graphql_1.ObjectType()
], UserListResponseGQL);
exports.UserListResponseGQL = UserListResponseGQL;
let UserLoginResponseGQL = class UserLoginResponseGQL extends ResponseGQL_1.GenericResponseGQL(UserLoginToken) {
};
UserLoginResponseGQL = __decorate([
    type_graphql_1.ObjectType()
], UserLoginResponseGQL);
exports.UserLoginResponseGQL = UserLoginResponseGQL;
let RoleResponse = class RoleResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RoleResponse.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RoleResponse.prototype, "key", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RoleResponse.prototype, "path", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RoleResponse.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RoleResponse.prototype, "route", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RoleResponse.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RoleResponse.prototype, "label", void 0);
RoleResponse = __decorate([
    type_graphql_1.ObjectType()
], RoleResponse);
exports.RoleResponse = RoleResponse;
let RolesResponse = class RolesResponse {
};
__decorate([
    type_graphql_1.Field(() => [RoleResponse]),
    __metadata("design:type", Array)
], RolesResponse.prototype, "roles", void 0);
RolesResponse = __decorate([
    type_graphql_1.ObjectType()
], RolesResponse);
exports.RolesResponse = RolesResponse;
//# sourceMappingURL=UserResponsesGQL.js.map