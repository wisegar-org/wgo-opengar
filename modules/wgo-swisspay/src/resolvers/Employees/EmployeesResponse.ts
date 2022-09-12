import { ObjectType, Field } from 'type-graphql';
import { UserResponse } from '../../wgo-base/authentication/resolvers/AuthResponses';

@ObjectType()
export class EmployeesResponse {
  @Field() id!: number;
  @Field() name!: string;
  @Field() email!: string;
  @Field() enterprise!: UserResponse;
  @Field() client!: UserResponse;
  @Field({ defaultValue: true }) confirmed!: boolean;
}

@ObjectType()
export class EmployeesToImportResponse {
  @Field() name!: string;
  @Field() lastName!: string;
  @Field() email!: string;
  @Field() code!: string;
  @Field() valid!: boolean;
}
