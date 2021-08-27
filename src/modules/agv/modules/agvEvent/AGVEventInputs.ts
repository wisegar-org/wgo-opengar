import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class AGVEnventInput {
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

  @Field((type) => Int, { nullable: true })
  imgTile?: number;
  @Field((type) => [Int], { nullable: true })
  imgList?: number[];
}
