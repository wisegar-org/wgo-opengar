import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SettingsResponse {
  @Field() type_settings!: string;
  @Field() key!: string;
  @Field({ nullable: true }) value!: string;
}
