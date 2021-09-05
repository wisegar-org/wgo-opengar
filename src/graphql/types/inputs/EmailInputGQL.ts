import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class EmailToAppInputGQL {
  @Field(() => String) from: string;
  @Field(() => String) subject: string;
  @Field(() => String) body: string;
}
@InputType()
export class EmailInputGQL extends EmailToAppInputGQL {
  @Field(() => String) to: string;
}

@ObjectType()
export class EmailToAppGQL {
  @Field(() => String) from: string;
  @Field(() => String) subject: string;
  @Field(() => String) body: string;
}
@ObjectType()
export class EmailGQL extends EmailToAppGQL {
  @Field(() => String) to: string;
}
