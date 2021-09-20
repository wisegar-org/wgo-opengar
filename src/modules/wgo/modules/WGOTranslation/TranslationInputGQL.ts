//TranslationInputGQL

import { Field, InputType } from 'type-graphql';

@InputType()
export class TranslationInputGQL {
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: false }) languageCode: string;
  @Field(() => String, { nullable: false }) key: string;
  @Field(() => String, { nullable: false }) value: string;
}

@InputType()
export class TranslationFilterInputGQL {
  @Field(() => String, { nullable: false }) languageCode: string;
  @Field(() => String, { nullable: true }) search: string;

  @Field(() => Number, { nullable: true, defaultValue: 0 }) skip: number;
  @Field(() => Number, { nullable: true, defaultValue: 10 }) take: number;
}
