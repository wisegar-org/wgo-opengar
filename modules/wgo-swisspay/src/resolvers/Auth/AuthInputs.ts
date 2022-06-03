import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field() user!: string;
  @Field() password!: string;
}

@InputType()
export class MeInput {
  @Field() token!: string;
}

@InputType()
export class RegisterInput {
  @Field() name!: string;
  @Field() lastName!: string;
  @Field() userName!: string;
  @Field() email!: string;
  @Field() password!: string;
  @Field() isEmailConfirmed!: boolean;
}
