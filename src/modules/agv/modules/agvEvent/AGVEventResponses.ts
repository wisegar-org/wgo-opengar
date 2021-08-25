import { Field, ObjectType } from 'type-graphql';
import { MediaResponseGQL } from '../../../../graphql/types/responses/MediaResponseGQL';

@ObjectType()
export class AGVEnventResponse {
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

  @Field((type) => MediaResponseGQL, { nullable: true })
  imgTile?: MediaResponseGQL;
  @Field((type) => [MediaResponseGQL], { nullable: true })
  imgList?: MediaResponseGQL[];
}
