import { Field, ObjectType } from 'type-graphql';
import { MediaResponseGQL } from '../WGOMedia/MediaResponseGQL';

@ObjectType()
export class StorageResponseGQL {
  @Field(() => Number, { nullable: false }) id: number;
  @Field(() => String) type: string;
  @Field(() => String) content: String;

  @Field((type) => MediaResponseGQL, { nullable: true })
  image?: MediaResponseGQL;
  @Field((type) => [MediaResponseGQL], { nullable: true })
  imageList?: MediaResponseGQL[];
}

@ObjectType()
export class StoragePageResponseGQL {
  @Field(() => Number) storageItemsCount: number;
  @Field(() => [StorageResponseGQL]) storageItems: StorageResponseGQL[];
}
