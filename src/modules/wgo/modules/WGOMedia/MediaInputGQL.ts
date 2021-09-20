import { Field, InputType } from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class MediaInputGQL {
  @Field(() => GraphQLUpload, { description: 'File uploaded' })
  file: typeof GraphQLUpload;
  @Field(() => Boolean, { description: 'Flag public file' })
  isPublic: boolean;
}
