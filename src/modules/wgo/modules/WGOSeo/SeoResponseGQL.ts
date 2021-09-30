import { Field, ObjectType } from 'type-graphql';
import { IMeta } from './SeoModel';

@ObjectType()
export class SeoMetaPropResponseGQL {
  @Field() name: string;
  @Field() value: string;
}

@ObjectType()
export class SeoMetaResponseGQL {
  @Field() name: string;
  @Field(() => [SeoMetaPropResponseGQL]) props: SeoMetaPropResponseGQL[];
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
