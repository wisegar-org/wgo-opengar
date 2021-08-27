import { Field, InputType } from 'type-graphql';

@InputType()
export class AGVPollInput {
  @Field(() => Number, { nullable: true }) id: number;
  @Field(() => String) email: string;
  @Field(() => String) name: string;
  @Field(() => String) class: string;
  @Field(() => Boolean) allowPhoto: boolean;
  @Field(() => Boolean) allergy: boolean;
  @Field(() => String) foodAllergy: string;
  @Field(() => Boolean) intolerance: boolean;
  @Field(() => String) foodIntolerance: string;
  @Field(() => String) parentName: string;
  @Field(() => String) parentEmail: string;
  @Field(() => String) phone: string;
  @Field(() => Boolean) disposition: boolean;
  @Field(() => Boolean) interest: boolean;
}
