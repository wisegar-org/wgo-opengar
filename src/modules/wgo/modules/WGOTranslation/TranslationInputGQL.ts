//TranslationInputGQL

import { Field, InputType } from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class TranslationInputGQL {
  @Field(() => Number, { nullable: false }) languageId: number;
  @Field(() => String, { nullable: false }) key: string;
  @Field(() => String, { nullable: false }) value: string;
}

@InputType()
export class TranslationFilterInputGQL {
  @Field(() => Number, { nullable: false }) languageId: number;
  @Field(() => String, { nullable: true }) search: string;

  @Field(() => Number, { nullable: true, defaultValue: 0 }) skip: number;
  @Field(() => Number, { nullable: true, defaultValue: 10 }) take: number;
}

@InputType()
export class GetTranslationInputGQL {
  @Field(() => Number, { nullable: false }) languageId: number;
  @Field(() => String, { nullable: false }) key: string;
}

@InputType()
export class ItemTranslationsInputGQL {
  @Field(() => String, { nullable: false }) key: string;
  @Field(() => Boolean, { nullable: false }) trim: boolean;
}
@InputType()
export class GetListTranslationsInputGQL {
  @Field(() => Number, { nullable: false }) languageId: number;
  @Field(() => [ItemTranslationsInputGQL], { nullable: false }) items: ItemTranslationsInputGQL[];
}

@InputType()
export class ImportTranslationsInputGQL {
  @Field(() => GraphQLUpload, { description: 'File uploaded' })
  file: typeof GraphQLUpload;
  @Field(() => Number, { description: 'Language id' })
  languageId: number;
}
