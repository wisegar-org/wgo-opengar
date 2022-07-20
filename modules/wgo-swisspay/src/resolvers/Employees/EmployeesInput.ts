import { Field, InputType } from 'type-graphql';

@InputType()
export class UserFilterInput {
  @Field() id!: number;
}

@InputType()
export class EmployeesFilterInput {
  @Field(() => UserFilterInput) enterprise_id!: UserFilterInput;
}

@InputType()
export class EmployeesRegisterInput {
  @Field(() => String) email!: string;
  @Field(() => UserFilterInput) enterprise_id!: UserFilterInput;
}
