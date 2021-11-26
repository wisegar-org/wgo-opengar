import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class EmailFromToAppInputGQL {
  @Field(() => String) subject: string;
  @Field(() => String) body: string;
}
@InputType()
export class EmailToAppInputGQL extends EmailFromToAppInputGQL {
  @Field(() => String) from: string;
}
@InputType()
export class EmailInputGQL extends EmailToAppInputGQL {
  @Field(() => String) to: string;
}

@InputType()
export class EmailToAddressAndAppInputGQL extends EmailFromToAppInputGQL {
  @Field(() => String) to: string;
}

@ObjectType()
export class EmailFromToAppGQL {
  @Field(() => String) subject: string;
  @Field(() => String) body: string;
}
@ObjectType()
export class EmailToAppGQL extends EmailFromToAppGQL {
  @Field(() => String) from: string;
}
@ObjectType()
export class EmailGQL extends EmailToAppGQL {
  @Field(() => String) to: string;
}
