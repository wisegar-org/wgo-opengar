import { Field, ObjectType } from 'type-graphql';
import { MediaResponseGQL } from '../../../wgo/modules';

@ObjectType()
export class CasinaIndexContentResponseGQL {
  @Field(() => MediaResponseGQL, { nullable: true }) image: MediaResponseGQL;
}
