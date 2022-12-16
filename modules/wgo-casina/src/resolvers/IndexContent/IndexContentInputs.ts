import { Field, InputType } from "type-graphql";
import { TranslationInput } from "@wisegar-org/wgo-base-server";

@InputType()
export class CasinaIndexContentInputs {
  @Field(() => Number, { defaultValue: 0 })
  imageId?: number;
  @Field(() => [TranslationInput], { defaultValue: [] })
  translations!: TranslationInput[];
}
