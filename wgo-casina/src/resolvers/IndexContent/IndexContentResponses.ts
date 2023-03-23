import { Field, ObjectType } from "type-graphql";
import { MediaResponse } from "@wisegar-org/wgo-base-server";

@ObjectType()
export class CasinaIndexContentResponse {
  @Field(() => MediaResponse, { nullable: true }) image!: MediaResponse;
}
