import { Field, InputType } from 'type-graphql';

@InputType()
export class UserFilterInput {
  @Field() id!: number;
}

@InputType()
export class EmployeesFilterInput {
  @Field() enterprise_id!: UserFilterInput;
}
