import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class EmailMediaResponse {
  @Field() id!: number;
  @Field() name!: string;
  @Field() senderTo!: string;
  @Field() fileName!: string;
  @Field() fileExt!: string;
  @Field() isPublic!: boolean;
  @Field() contentId!: string;
  @Field() contentType!: string;
  @Field() size!: number;
  @Field() emailId!: number;
}

@ObjectType()
export class EmailResponse {
  @Field() id!: number;
  @Field() from!: string;
  @Field() to!: string;
  @Field() cc!: string;
  @Field() bcc!: string;
  @Field() subject!: string;
  @Field() headers!: string;
  @Field() date!: Date;
  @Field() messageId!: string;
  @Field() inReplyTo!: string;
  @Field() replyTo!: string;
  @Field() references!: string;
  @Field() html!: string;
  @Field() text!: string;
  @Field() textAsHtml!: string;
  @Field(() => [EmailMediaResponse]) attachments?: EmailMediaResponse[];
}
