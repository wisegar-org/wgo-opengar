import { Field, InputType } from "type-graphql";
import { TranslationInput } from "../../wgo-base/translation/resolvers/TranslationInputs";

@InputType()
export class IndexContentInputs {
  @Field(() => Number, { nullable: false })
  imageId?: number;
  @Field(() => [TranslationInput], { nullable: false })
  translations!: TranslationInput[];
}
