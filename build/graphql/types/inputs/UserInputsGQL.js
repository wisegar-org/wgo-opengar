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
exports.UserFilterArgs = exports.UserCreateArgs = exports.UserRolesInputGQL = exports.LoginModelInputGQL = exports.UserInputGQL = void 0;
const type_graphql_1 = require("type-graphql");
//  @InputType()
// export class ProfiloInput {
// @Field(() => String, { nullable: true })
// vocativo?: string;
// @Field(() => String, { nullable: true })
// name?: string;
// @Field(() => String, { nullable: true })
// lastName?: string;
// @Field(() => String, { nullable: true })
// indirizzo1?: string;
// @Field(() => String, { nullable: true })
// indirizzo2?: string;
// @Field(() => String, { nullable: true })
// cap?: string;
// @Field(() => String, { nullable: true })
// localita?: string;
// @Field(() => String, { nullable: true })
// nazione?: string;
// @Field(() => String, { nullable: true })
// extra?: string;
//}
// @InputType()
// export class UserLoginInput {
//   @Field(() => String, { description: "email valida usata per il login" })
//   @IsEmail({}, { message: "Email non valida!!!!!!!!" })
//   email: string;
//   @Length(6, 16)
//   @Field(() => String, {
//     description: "password minimo 6 caratteri massimo 16",
//   })
//   password: string;
// }
// @InputType()
// export class UserInput {
//   @Field(() => String)
//   @IsEmail({}, { message: "Email non valida!!!!!!!!" })
//   email: string;
//   @Field(() => String)
//   @Length(6, 64)
//   password: string;
//   // @Field((type) => ProfiloInput, { nullable: true })
//   // profilo?: ProfiloInput;
// }
// @InputType()
// export class UserUpdateInput {
//   @Field({ nullable: true })
//   email: string;
//   // @Field((type) => ProfiloInput, { nullable: true })
//   // profilo?: ProfiloInput;
// }
// @InputType()
// export class UserUpdateStatoInput {
//   /* @Field(() => Status)
//   status: Status; */
// }
// @InputType()
// export class UserUpdatePasswordInput {
//   @Field()
//   password: string;
// }
// @InputType()
// export class SetRolesInput {
//   @Field(() => String)
//   uuid: string;
//   @Field(() => [String])
//   roles: string[];
// }
// @ObjectType()
// export class UserGQL {
//   @Field(() => ID)
//   id: number;
//   @Field()
//   uuid: string;
//   @Field()
//   name: string;
//   @Field()
//   lastName: string;
//   @Field()
//   userName: string;
//   @Field()
//   email: string;
//   @Field()
//   password: string;
//   @Field()
//   isEmailConfirmed: boolean;
//   @Field(() => [RoleGQL])
//   roles: RoleGQL[];
//   // @Field(() => [RolEntity])
//   // profileImage: MediaEntity;
// }
let UserInputGQL = class UserInputGQL {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", Number)
], UserInputGQL.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserInputGQL.prototype, "uuid", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputGQL.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputGQL.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputGQL.prototype, "userName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputGQL.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputGQL.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], UserInputGQL.prototype, "roles", void 0);
UserInputGQL = __decorate([
    type_graphql_1.InputType()
], UserInputGQL);
exports.UserInputGQL = UserInputGQL;
let LoginModelInputGQL = class LoginModelInputGQL {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginModelInputGQL.prototype, "userName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginModelInputGQL.prototype, "password", void 0);
LoginModelInputGQL = __decorate([
    type_graphql_1.InputType()
], LoginModelInputGQL);
exports.LoginModelInputGQL = LoginModelInputGQL;
let UserRolesInputGQL = class UserRolesInputGQL {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRolesInputGQL.prototype, "userUuid", void 0);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.Int]),
    __metadata("design:type", Array)
], UserRolesInputGQL.prototype, "roleIds", void 0);
UserRolesInputGQL = __decorate([
    type_graphql_1.InputType()
], UserRolesInputGQL);
exports.UserRolesInputGQL = UserRolesInputGQL;
let UserCreateArgs = class UserCreateArgs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateArgs.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateArgs.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateArgs.prototype, "userName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateArgs.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateArgs.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], UserCreateArgs.prototype, "isEmailConfirmed", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], UserCreateArgs.prototype, "roles", void 0);
UserCreateArgs = __decorate([
    type_graphql_1.ArgsType()
], UserCreateArgs);
exports.UserCreateArgs = UserCreateArgs;
let UserFilterArgs = class UserFilterArgs {
};
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UserFilterArgs.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserFilterArgs.prototype, "uuid", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserFilterArgs.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserFilterArgs.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserFilterArgs.prototype, "lastName", void 0);
UserFilterArgs = __decorate([
    type_graphql_1.ArgsType()
], UserFilterArgs);
exports.UserFilterArgs = UserFilterArgs;
//# sourceMappingURL=UserInputsGQL.js.map