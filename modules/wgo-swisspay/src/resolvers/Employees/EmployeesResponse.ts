import { UserResponse } from '@wisegar-org/wgo-base-server';
import { ObjectType, Field } from 'type-graphql';

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

@ObjectType()
export class EmployeesEnterpriseToRegisterResponse {
  @Field() user_id!: number;
  @Field() enterprise_id!: number;
  @Field() enterprise_name!: string;
}
