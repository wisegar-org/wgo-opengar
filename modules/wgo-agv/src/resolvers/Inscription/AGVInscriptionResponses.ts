import { Field, ObjectType } from 'type-graphql';
import { AGVEventResponse } from '../agvEvent/AGVEventResponses';

@ObjectType()
export class AGVInscriptionResponse {
  @Field(() => Number, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) nome: string;
  @Field(() => String, { nullable: false }) cognome: string;
  @Field(() => String, { nullable: false }) email: string;
  @Field(() => String, { nullable: false }) phone: string;
  @Field(() => String, { nullable: false }) message: string;
  @Field(() => String, { nullable: false }) class: string;
  @Field(() => Date, { nullable: false }) date: Date;

  @Field(() => Number) eventId: number;
  @Field(() => String) eventTitle: string;
  @Field(() => String) eventClass: string;

  @Field(() => AGVEventResponse) event: AGVEventResponse;
}

@ObjectType()
export class AGVInscriptionAddResponse {
  @Field(() => Boolean, { defaultValue: false }) create: boolean;
  @Field(() => Boolean, { defaultValue: false }) exist: boolean;
  @Field(() => Boolean, { defaultValue: false }) error: boolean;
}
