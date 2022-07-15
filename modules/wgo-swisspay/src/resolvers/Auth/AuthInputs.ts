import { Field, InputType } from 'type-graphql';

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
  @Field(() => [String], { nullable: true }) roles?: string[];
}

@InputType()
export class EditUserInput extends RegisterInput {
  @Field() id!: number;
  @Field() code!: string;
}

@InputType()
export class ResendConfirmationInput {
  @Field() email!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field() token!: string;
  @Field() password!: string;
}
