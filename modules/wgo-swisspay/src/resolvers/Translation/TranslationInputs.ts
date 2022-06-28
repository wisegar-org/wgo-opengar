import { Field, InputType } from 'type-graphql';

@InputType()
export class GetAllTranslationInput {
  @Field() languageId!: number;
  @Field({ nullable: true, defaultValue: '' }) search!: string;
}

@InputType()
export class GetTranslationByKeysInput {
  @Field() languageId!: number;
  @Field(() => [String]) keys!: string[];
}

@InputType()
export class SetTranslationInput {
  @Field() key!: string;
  @Field() value!: string;
  @Field() languageId!: number;
}
