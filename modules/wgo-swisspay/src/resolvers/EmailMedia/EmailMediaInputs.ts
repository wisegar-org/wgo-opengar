import { Field, InputType } from 'type-graphql';

@InputType()
export class EmailMediaFilterInput {
  @Field() email!: string;
}
