import { Field, InputType } from "type-graphql";
import { TranslationInput } from "../../wgo-base/translation/resolvers/TranslationInputs";

@InputType()
export class CasinaIndexContentInputs {
  @Field(() => Number, { defaultValue: 0 })
  imageId?: number;
  @Field(() => [TranslationInput], { defaultValue: [] })
  translations!: TranslationInput[];
}
