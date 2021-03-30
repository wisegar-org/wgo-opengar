"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleListResponseGQL = exports.RoleResponseGQL = void 0;
const type_graphql_1 = require("type-graphql");
const ResponseGQL_1 = require("./ResponseGQL");
const RoleInputGQL_1 = require("../inputs/RoleInputGQL");
let RoleResponseGQL = class RoleResponseGQL extends ResponseGQL_1.GenericResponseGQL(RoleInputGQL_1.RoleGQL) {
};
RoleResponseGQL = __decorate([
    type_graphql_1.ObjectType()
], RoleResponseGQL);
exports.RoleResponseGQL = RoleResponseGQL;
let RoleListResponseGQL = class RoleListResponseGQL extends ResponseGQL_1.GenericArrayResponseGQL(RoleInputGQL_1.RoleGQL) {
};
RoleListResponseGQL = __decorate([
    type_graphql_1.ObjectType()
], RoleListResponseGQL);
exports.RoleListResponseGQL = RoleListResponseGQL;
//# sourceMappingURL=RoleResponseGQL.js.map