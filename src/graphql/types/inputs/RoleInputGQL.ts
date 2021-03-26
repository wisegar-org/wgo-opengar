import { Field, ObjectType, InputType, ArgsType, Int } from "type-graphql";
import { UserGQL } from "../responses/UserResponsesGQL";
import { UserEntity } from "@wisegar-org/wgo-opengar-core";

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
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
