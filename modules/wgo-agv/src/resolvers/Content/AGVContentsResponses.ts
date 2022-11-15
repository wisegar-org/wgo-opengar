import { Field, ObjectType } from 'type-graphql';
import { MediaResponseGQL } from '../../../wgo/modules';

@ObjectType()
export class AGVContentsResponse {
  @Field(() => String) contents: string;
}
