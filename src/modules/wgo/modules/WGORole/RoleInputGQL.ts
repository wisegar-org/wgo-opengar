import { Field, ObjectType, InputType, ArgsType } from 'type-graphql';
import { UserGQL } from '../WGOUser/UserResponsesGQL';
import { UserEntity } from '@wisegar-org/wgo-opengar-core';

@ObjectType()
export class RoleGQL {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field(() => [UserGQL], { nullable: true })
  users?: UserEntity[];
}

@InputType()
export class RoleInputGQL {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;

  users: [UserGQL];
}

@ArgsType()
export class RoleFilterArgs {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
