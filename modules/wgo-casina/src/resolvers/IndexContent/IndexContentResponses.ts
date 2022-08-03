import { Field, ObjectType } from "type-graphql";
import { MediaResponse } from "../../wgo-base/storage/resolvers/Media/MediaResponses";

@ObjectType()
export class CasinaIndexContentResponse {
  @Field(() => MediaResponse, { nullable: true }) image!: MediaResponse;
}
