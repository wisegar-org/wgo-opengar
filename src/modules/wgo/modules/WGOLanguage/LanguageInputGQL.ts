import { Field, InputType } from 'type-graphql';

@InputType()
export class LanguageInputGQL {
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: false }) code: string;
  @Field(() => Boolean, { nullable: false }) default: boolean;
  @Field(() => Boolean, { nullable: false }) disabled: boolean;
  @Field(() => Number, { nullable: true }) logoId: number;
}
