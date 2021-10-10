import { Field, ObjectType } from 'type-graphql';
import { IMeta } from './SeoModel';

@ObjectType()
export class SeoMetaResponseGQL {
  @Field(() => String, { nullable: false })
  name?: string;
  @Field(() => String, { nullable: false })
  property?: string;
  @Field(() => String, { nullable: false })
  content?: string;
  @Field(() => String, { nullable: false })
  type?: string;
}

@ObjectType()
export class SeoResponseGQL {
  @Field(() => String, { nullable: false })
  module?: string;
  @Field(() => String, { nullable: false })
  path?: string;
  @Field(() => [SeoMetaResponseGQL], { nullable: false })
  meta?: SeoMetaResponseGQL[];
}
