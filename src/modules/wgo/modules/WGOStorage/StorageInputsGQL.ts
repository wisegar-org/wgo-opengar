import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class StorageInputGQL {
  @Field(() => Number, { nullable: false }) id: number;
  @Field(() => String) type: string;
  @Field(() => String) content: String;

  @Field((type) => Int, { nullable: true })
  image?: number;
  @Field((type) => [Int], { nullable: true })
  imageList?: number[];
}

@InputType()
export class StoragePageInputGQL {
  @Field(() => Number, { defaultValue: 0 }) skip: number;
  @Field(() => Number, { defaultValue: 5 }) take: number;
  @Field(() => String) type: string;
  @Field(() => String) urlApi: string;
  @Field(() => String, { defaultValue: '' }) search: string;
}

@InputType()
export class StorageAllInputGQL {
  @Field(() => String) type: string;
  @Field(() => String) urlApi: string;
  @Field(() => String, { defaultValue: '' }) search: string;
}
