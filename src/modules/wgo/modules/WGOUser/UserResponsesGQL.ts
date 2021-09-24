import { Field, ObjectType } from 'type-graphql';
import { RolEntity } from '@wisegar-org/wgo-opengar-core';
import { UserEntity } from '@wisegar-org/wgo-opengar-core';
import { LanguageResponseGQL, RoleGQL } from '..';
import { GenericArrayResponseGQL, GenericResponseGQL } from '../ResponseGQL';
import { Role } from '../../models/RolesClass';

@ObjectType()
export class UserGQL {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  uuid: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  userName: string;
  @Field()
  isEmailConfirmed: boolean;

  @Field(() => [RoleGQL])
  roles: RolEntity[];
  @Field(() => Number, { nullable: true })
  languageId: number;
  @Field(() => LanguageResponseGQL, { nullable: true })
  language: LanguageResponseGQL;
}
@ObjectType()
export class UserLoginToken {
  @Field(() => String, { nullable: true })
  token: string;
  @Field(() => UserGQL)
  user: UserEntity;
}

@ObjectType()
export class UserResponseGQL extends GenericResponseGQL(UserGQL) {}

@ObjectType()
export class UserListResponseGQL extends GenericArrayResponseGQL(UserGQL) {}

@ObjectType()
export class UserLoginResponseGQL extends GenericResponseGQL(UserLoginToken) {}

@ObjectType()
export class RoleResponse {
  @Field()
  id: number;
  @Field()
  key: string;
  @Field()
  path: string;
  @Field()
  user: number;
  @Field()
  route: number;
  @Field()
  level: number;
  @Field()
  label?: string;
}

@ObjectType()
export class RolesResponse {
  @Field(() => [RoleResponse])
  roles: Role[];
}
