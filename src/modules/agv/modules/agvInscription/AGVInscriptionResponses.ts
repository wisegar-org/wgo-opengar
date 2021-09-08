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

  @Field(() => AGVEventResponse) event: AGVEventResponse;
}
