import { Field, InputType } from 'type-graphql';

@InputType()
export class SeoMetaPropsInputGQL {
  @Field(() => String, { nullable: false })
  name?: string;
  @Field(() => String, { nullable: false })
  value?: string;
}

@InputType()
export class SeoMetaInputGQL {
  @Field(() => String, { nullable: false })
  name?: string;
  @Field(() => [SeoMetaPropsInputGQL], { nullable: false })
  props?: SeoMetaPropsInputGQL[];
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
