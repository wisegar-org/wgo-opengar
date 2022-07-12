import { Field, InputType } from 'type-graphql';

@InputType()
export class EmployeesFilterInput {
  @Field() enterprise_id!: number;
}
