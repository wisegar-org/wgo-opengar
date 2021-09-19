import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MediaResponseGQL {
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  mimetype?: string;
  @Field(() => Boolean, { nullable: true })
  isPublic?: boolean;
  @Field(() => String, { nullable: true })
  data?: string;
  @Field(() => String, { nullable: true })
  url?: string;
  @Field(() => String, { nullable: true })
  error?: string;
}
