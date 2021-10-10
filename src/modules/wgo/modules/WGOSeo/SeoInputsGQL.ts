import { Field, InputType } from 'type-graphql';

@InputType()
export class SeoMetaInputGQL {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  property?: string;
  @Field(() => String, { nullable: true })
  content?: string;
  @Field(() => String, { nullable: true })
  type?: string;
}

@InputType()
export class SeoInputGQL {
  @Field(() => String, { nullable: false })
  module?: string;
  @Field(() => String, { nullable: false })
  path?: string;
  @Field(() => [SeoMetaInputGQL], { nullable: false })
  meta?: SeoMetaInputGQL[];
}
