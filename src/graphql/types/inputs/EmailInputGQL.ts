import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class EmailInputGQL {
  @Field(() => String) from: string;
  @Field(() => String) to: string;
  @Field(() => String) subject: string;
  @Field(() => String) body: string;
}

@ObjectType()
export class EmailGQL {
  @Field(() => String) from: string;
  @Field(() => String) to: string;
  @Field(() => String) subject: string;
  @Field(() => String) body: string;
}
