import { ArgsType, Field, ID, InputType, Int } from "type-graphql";

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

@InputType()
export class UserInputGQL {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  uuid: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  userName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => [Int], { nullable: true })
  roles: number[];

  isEmailConfirmed: boolean;
}

@InputType()
export class LoginModelInputGQL {
  @Field()
  userName: string;

  @Field()
  password: string;
}

@InputType()
export class UserRolesInputGQL {
  @Field()
  userUuid: string;

  @Field(() => [Int])
  roleIds: number[];
}

@ArgsType()
export class UserCreateArgs {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  userName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  isEmailConfirmed: boolean;

  @Field(() => [String])
  roles: string[];

  // @Field(() => [RolEntity])
  // profileImage: MediaEntity;
}

@ArgsType()
export class UserFilterArgs {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}
