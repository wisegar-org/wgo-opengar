import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserResponse {
  @Field() id!: number;
  @Field() name!: string;
  @Field() lastName!: string;
  @Field() userName!: string;
  @Field() email!: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => UserResponse, { nullable: true }) user!: UserResponse;
  @Field() token!: string;
}