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
exports.ClientListResponseGQL = exports.ClientResponseGQL = exports.ClientGQL = void 0;
const type_graphql_1 = require("type-graphql");
const ResponseGQL_1 = require("./ResponseGQL");
const BillResponseGQL_1 = require("./BillResponseGQL");
let ClientGQL = class ClientGQL {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ClientGQL.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], ClientGQL.prototype, "birthDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "sex", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "civilStatus", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "principalAddress", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "principalCap", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "principalCity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "principalMail", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "principalPhone", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "secundaryAddress", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "secundaryCap", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "secundaryCity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "secundaryMail", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientGQL.prototype, "secundaryPhone", void 0);
__decorate([
    type_graphql_1.Field(() => [BillResponseGQL_1.BillGQL]),
    __metadata("design:type", Array)
], ClientGQL.prototype, "bills", void 0);
ClientGQL = __decorate([
    type_graphql_1.ObjectType()
], ClientGQL);
exports.ClientGQL = ClientGQL;
let ClientResponseGQL = class ClientResponseGQL extends ResponseGQL_1.GenericResponseGQL(ClientGQL) {
};
ClientResponseGQL = __decorate([
    type_graphql_1.ObjectType()
], ClientResponseGQL);
exports.ClientResponseGQL = ClientResponseGQL;
let ClientListResponseGQL = class ClientListResponseGQL extends ResponseGQL_1.GenericArrayResponseGQL(ClientGQL) {
};
ClientListResponseGQL = __decorate([
    type_graphql_1.ObjectType()
], ClientListResponseGQL);
exports.ClientListResponseGQL = ClientListResponseGQL;
//# sourceMappingURL=ClientResponseGQL.js.map