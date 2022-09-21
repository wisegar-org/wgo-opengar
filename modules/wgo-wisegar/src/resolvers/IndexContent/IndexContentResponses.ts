import { Field, ObjectType } from "type-graphql";
import { MediaResponse } from "../../wgo-base/storage/resolvers/Media/MediaResponses";

@ObjectType()
export class IndexContentResponse {
  @Field(() => MediaResponse, { nullable: true }) image!: MediaResponse;
}
