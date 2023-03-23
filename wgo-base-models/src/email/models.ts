import { Readable } from "stream";
import { Url } from "url";

export interface IEmailOptions {
  subject: string;
  to: string;
  from?: string;
  text?: string;
  html?: string;
  bcc?: string;
  envelope?: {
    to: string;
    from: string;
  };
  attachments?: {
    filename?: string;
    content?: string | Buffer | Readable;
    path?: string | Url;
    encoding?: string;
  }[];
}

export interface IEmailNotify {
  emailOptions: IEmailOptions;
  bodyTemplate: {
    //Body message or Handlebars template
    template: string;
    //Handlebars data
    data: any;
  };
}

export interface IEmailFromToAppInput {
  subject: string;
  body: string;
  data?: string;
}

export interface IEmailToAppInput extends IEmailFromToAppInput {
  from: string;
}

export interface IEmailInput extends IEmailToAppInput {
  to: string;
}

export interface IEmailToAddressAndAppInput extends IEmailFromToAppInput {
  to: string;
}

export interface IEmailFromToApp {
  subject: string;
  body: string;
}

export interface IEmailToApp extends IEmailFromToApp {
  from: string;
}

export interface IEmail extends IEmailToApp {
  to: string;
}

export interface IEmailResponse {
  isSuccess: boolean;
  result?: IEmail | null;
  message?: string | null;
  error?: string | null;
}
