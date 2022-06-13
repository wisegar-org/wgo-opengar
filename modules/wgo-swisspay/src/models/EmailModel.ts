
export class EmailModel {
  id!: number;
  from!: string;
  to!: string;
  cc!: string;
  bcc!: string;
  subject!: string;
  headers!: string;
  date!: Date;
  messageId!: string;
  inReplyTo!: string;
  replyTo!: string;
  references!: string;
  html!: string;
  text!: string;
  textAsHtml!: string;
  contentType!: string;
  boundary!: string;
  attachments?: AttachmentModel[];
}

export class AttachmentModel {
  id!: number;
  name!: string;
  content!: string;
  contentType!: string;
  contentTransferEncoding!: string;
  contentDisposition!: string;
  contentDescription!: string;
}