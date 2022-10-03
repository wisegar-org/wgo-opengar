import { Field, InputType } from "type-graphql";

@InputType()
export class FinanceIssuesFilterInput {
  @Field(() => Number, { defaultValue: 0 }) project!: number;
  @Field(() => Number, { defaultValue: 0 }) repository!: number;
  @Field(() => Number, { defaultValue: 0 }) assignedTo!: number;
  @Field(() => String, { defaultValue: "" }) labels!: string;
}

@InputType()
export class FinanceIssuesPageInput {
  @Field(() => Number, { defaultValue: 0 }) skip!: number;
  @Field(() => Number, { defaultValue: 5 }) take!: number;
  @Field(() => FinanceIssuesFilterInput) filter!: FinanceIssuesFilterInput;

  @Field(() => String, { defaultValue: "" }) sortBy!: string;
  @Field(() => Boolean, { defaultValue: true }) descending!: boolean;
}
