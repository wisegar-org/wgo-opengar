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
exports.GenericArrayResponseGQL = exports.GenericResponseGQL = void 0;
const type_graphql_1 = require("type-graphql");
function GenericResponseGQL(TItemClass) {
    let ResponseGQL = class ResponseGQL {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ResponseGQL.prototype, "isSuccess", void 0);
    __decorate([
        type_graphql_1.Field(() => TItemClass, { nullable: true }),
        __metadata("design:type", Object)
    ], ResponseGQL.prototype, "result", void 0);
    __decorate([
        type_graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", String)
    ], ResponseGQL.prototype, "message", void 0);
    __decorate([
        type_graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", String)
    ], ResponseGQL.prototype, "error", void 0);
    ResponseGQL = __decorate([
        type_graphql_1.ObjectType({ isAbstract: true })
    ], ResponseGQL);
    return ResponseGQL;
}
exports.GenericResponseGQL = GenericResponseGQL;
function GenericArrayResponseGQL(TItemClass) {
    let ArrayResponseGQL = class ArrayResponseGQL {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ArrayResponseGQL.prototype, "isSuccess", void 0);
    __decorate([
        type_graphql_1.Field(() => [TItemClass]),
        __metadata("design:type", Array)
    ], ArrayResponseGQL.prototype, "result", void 0);
    __decorate([
        type_graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", String)
    ], ArrayResponseGQL.prototype, "message", void 0);
    __decorate([
        type_graphql_1.Field(() => String, { nullable: true }),
        __metadata("design:type", String)
    ], ArrayResponseGQL.prototype, "error", void 0);
    ArrayResponseGQL = __decorate([
        type_graphql_1.ObjectType({ isAbstract: true })
    ], ArrayResponseGQL);
    return ArrayResponseGQL;
}
exports.GenericArrayResponseGQL = GenericArrayResponseGQL;
//# sourceMappingURL=ResponseGQL.js.map