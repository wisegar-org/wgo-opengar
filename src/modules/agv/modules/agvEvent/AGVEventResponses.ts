import { Field, ObjectType } from 'type-graphql';
import { MediaResponseGQL } from '../../../wgo/modules';

@ObjectType()
export class AGVEventResponse {
  @Field(() => Number, { nullable: false }) id: number;
  @Field(() => String) title: string;
  @Field(() => String) description: string;
  @Field(() => String, { nullable: true }) shortDescription: string;
  @Field(() => String) class: string;
  @Field(() => String) type: string;
  @Field(() => String) state: string;
  @Field(() => Date, { nullable: true }) startDate: Date;
  @Field(() => Date, { nullable: true }) endDate: Date;
  @Field(() => Boolean) visible: boolean;
  @Field(() => Boolean) enrollment: boolean;
  @Field(() => Number) inscriptions: number;

  @Field((type) => MediaResponseGQL, { nullable: true })
  imgTitle?: MediaResponseGQL;
  @Field((type) => [MediaResponseGQL], { nullable: true })
  imgList?: MediaResponseGQL[];
}
