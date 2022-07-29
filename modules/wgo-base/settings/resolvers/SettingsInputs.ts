import { Field, InputType } from 'type-graphql';

@InputType()
export class PostSettingInput {
  @Field() type_settings!: string;
  @Field() key!: string;
  @Field() value!: string;
}
