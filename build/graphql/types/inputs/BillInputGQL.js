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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillInputGQL = void 0;
const type_graphql_1 = require("type-graphql");
const ClientEntity_1 = __importDefault(require("../../../database/entities/ClientEntity"));
const ClientResponseGQL_1 = require("../responses/ClientResponseGQL");
let BillInputGQL = class BillInputGQL {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "billNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], BillInputGQL.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BillInputGQL.prototype, "lensDescription", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "lensPrice", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BillInputGQL.prototype, "frameDescription", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "framePrice", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BillInputGQL.prototype, "serviceDescription", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "servicePrice", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "offer", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "payment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BillInputGQL.prototype, "balance", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BillInputGQL.prototype, "observation", void 0);
__decorate([
    type_graphql_1.Field(() => ClientResponseGQL_1.ClientGQL),
    __metadata("design:type", ClientEntity_1.default)
], BillInputGQL.prototype, "client", void 0);
BillInputGQL = __decorate([
    type_graphql_1.InputType()
], BillInputGQL);
exports.BillInputGQL = BillInputGQL;
//# sourceMappingURL=BillInputGQL.js.map