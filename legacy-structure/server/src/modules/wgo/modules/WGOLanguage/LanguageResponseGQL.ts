import { Field, ObjectType } from 'type-graphql';
import { MediaResponseGQL } from '../WGOMedia/MediaResponseGQL';

@ObjectType()
export class LanguageResponseGQL {
  @Field(() => Number) id: number;
  @Field(() => String) code: string;
  @Field(() => Boolean) default: boolean;
  @Field(() => Boolean) enabled: boolean;
  @Field(() => MediaResponseGQL, { nullable: true }) logo: MediaResponseGQL;
}
