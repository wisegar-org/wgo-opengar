import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class AGVInscriptionInput {
  @Field(() => Number, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) nome: string;
  @Field(() => String, { nullable: false }) cognome: string;
  @Field(() => String, { nullable: false }) email: string;
  @Field(() => String, { nullable: false }) phone: string;
  @Field(() => String, { nullable: false }) message: string;

  @Field(() => Int, { nullable: false }) eventId: number;
}
