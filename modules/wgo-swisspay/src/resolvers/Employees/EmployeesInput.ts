import { GraphQLUpload } from 'graphql-upload';
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

@InputType()
export class EmployeesInput {
  @Field(() => String) email!: string;
  @Field(() => String) name!: string;
  @Field(() => UserFilterInput) enterprise_id!: UserFilterInput;
  @Field(() => UserFilterInput) client_id!: UserFilterInput;
}

@InputType()
export class EmployeesTokenInput {
  @Field(() => String) token!: string;
}

@InputType()
export class EmployeeSendDocumentsInput {
  @Field(() => UserFilterInput) enterprise_id!: UserFilterInput;
  @Field(() => UserFilterInput) client_id!: UserFilterInput;
  @Field(() => [GraphQLUpload], { description: 'Files uploaded' })
  files!: Promise<typeof GraphQLUpload>[];
}
