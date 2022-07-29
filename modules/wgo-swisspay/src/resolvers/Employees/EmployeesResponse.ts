import { ObjectType, Field } from 'type-graphql';
import { UserResponse } from '../../wgo-base/authentication/resolvers/AuthResponses';

@ObjectType()
export class EmployeesResponse {
  @Field() id!: number;
  @Field() name!: string;
  @Field() email!: string;
  @Field() enterprise!: UserResponse;
  @Field() client!: UserResponse;
}
