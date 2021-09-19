import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TranslationFilterResponseGQL {
  @Field(() => Number) id: string;
  @Field(() => String) key: string;
  @Field(() => String) value: string;
}

@ObjectType()
export class TranslationFilterPageResponseGQL {
  @Field(() => Number) translationsCount: number;
  @Field(() => [TranslationFilterResponseGQL]) translations: TranslationFilterResponseGQL[];
}
