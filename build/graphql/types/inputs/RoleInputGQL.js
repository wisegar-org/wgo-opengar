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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleFilterArgs = exports.RoleInputGQL = exports.RoleGQL = void 0;
const type_graphql_1 = require("type-graphql");
const UserResponsesGQL_1 = require("../responses/UserResponsesGQL");
let RoleGQL = class RoleGQL {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], RoleGQL.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RoleGQL.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [UserResponsesGQL_1.UserGQL], { nullable: true }),
    __metadata("design:type", Array)
], RoleGQL.prototype, "users", void 0);
RoleGQL = __decorate([
    type_graphql_1.ObjectType()
], RoleGQL);
exports.RoleGQL = RoleGQL;
let RoleInputGQL = class RoleInputGQL {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], RoleInputGQL.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RoleInputGQL.prototype, "name", void 0);
RoleInputGQL = __decorate([
    type_graphql_1.InputType()
], RoleInputGQL);
exports.RoleInputGQL = RoleInputGQL;
let RoleFilterArgs = class RoleFilterArgs {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], RoleFilterArgs.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RoleFilterArgs.prototype, "name", void 0);
RoleFilterArgs = __decorate([
    type_graphql_1.ArgsType()
], RoleFilterArgs);
exports.RoleFilterArgs = RoleFilterArgs;
//# sourceMappingURL=RoleInputGQL.js.map