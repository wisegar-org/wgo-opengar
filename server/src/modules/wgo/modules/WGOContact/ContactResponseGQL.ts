import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class WGOContactResponseGQL {
  @Field(() => String, { nullable: false })
  module?: string;
  @Field(() => String, { nullable: false })
  contactName?: string;
  @Field(() => String, { nullable: false })
  address?: string;
  @Field(() => String, { nullable: false })
  email?: string;
  @Field(() => String, { nullable: false })
  phoneNumber?: string;
  @Field(() => String, { nullable: false })
  mapPath?: string;
}
