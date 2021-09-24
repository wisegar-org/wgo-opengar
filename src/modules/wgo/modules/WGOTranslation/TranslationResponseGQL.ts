import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TranslationFilterResponseGQL {
  @Field(() => String) id: string;
  @Field(() => String) key: string;
  @Field(() => String) value: string;
}

@ObjectType()
export class TranslationFilterPageResponseGQL {
  @Field(() => Number) translationsCount: number;
  @Field(() => [TranslationFilterResponseGQL])
  translations: TranslationFilterResponseGQL[];
}

@ObjectType()
export class TranslationExportResponseGQL {
  @Field(() => String) data: string;
  @Field(() => Boolean) isSuccess: boolean;
}
