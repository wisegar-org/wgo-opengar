import { IBaseSettings } from '@wisegar-org/wgo-settings';

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

export interface Pop3Settings extends IBaseSettings {
  POP3_EMAIL_HOST: string;
  POP3_EMAIL_PORT: number;
  POP3_EMAIL_USER: string;
  POP3_EMAIL_PASSWORD: string;
  POP3_EMAIL_EMAIL: string;
  POP3_EMAIL_TLS: boolean;
}

export interface IEmailMediaModel {
  id: number;
  name: string;
  senderTo: string;
  fileName: string;
  fileExt: string;
  isPublic: boolean;
  contentId: string;
  contentType: string;
  size: number;
  emailId: number;
  email?: IEmailModel;
}

export interface IEmailMediaFilter {
  email: string;
}
export interface IEmailModel {
  id: number;
  from: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  headers: string;
  date: Date;
  messageId: string;
  inReplyTo: string;
  replyTo: string;
  references: string;
  html: string;
  text: string;
  textAsHtml: string;
  attachments?: IEmailMediaModel[];
}

export interface IEmailDetailsModel {
  email: IEmailModel;
  emailMedia: IEmailMediaModel;
}
