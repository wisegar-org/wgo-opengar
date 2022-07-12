import { ObjectType, Field } from 'type-graphql';
import { UserResponse } from '../Auth/AuthResponses';

@ObjectType()
export class EmployeesResponse {
  @Field() id!: number;
  @Field() name!: string;
  @Field() email!: string;
  @Field() enterprise_id!: UserResponse;
  @Field() client_id!: UserResponse;
}
