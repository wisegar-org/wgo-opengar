import { Field, InputType } from 'type-graphql';
import { TranslationInputGQL } from '../../../wgo/modules';

@InputType()
export class FinanceIndexContentInputsGQL {
  @Field(() => Number, { nullable: false })
  imageId?: number;
  @Field(() => [TranslationInputGQL], { nullable: false })
  translations: TranslationInputGQL[];
}
