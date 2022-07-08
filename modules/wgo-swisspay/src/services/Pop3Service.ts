import { Pop3Settings } from './../models/EmailModel';
import { EmailHistoryEntity } from './../database/entities/EmailHistoryEntity';
import { EmailMediaEntity } from './../database/entities/EmailMediaEntity';
import { PostgresDataSource } from './../../dataSources';

import { IPop3ConnectionOptions, Pop3Command } from '@wisegar-org/wgo-pop3';
import { Buffer } from 'buffer';
import { ParsedMail, simpleParser } from 'mailparser';

import { GetConfig } from '@wisegar-org/wgo-settings';
import { READ_EMAILS_INTERVAL } from '../models/constants';
import PDFService from './PDFService';

import { EmailServer } from '@wisegar-org/wgo-mailer';

export class Pop3Service {
  /**
   * Service to consume emails from a POP3
   */
  clientOptions: IPop3ConnectionOptions;

  constructor(clientOptions: IPop3ConnectionOptions) {
    this.clientOptions = clientOptions;
  }

  // Get number of messages in the mailbox
  async getNumMessages() {
    var pop3 = new Pop3Command(this.clientOptions);

    // STAT command to get the number of messages in the mailbox
    try {
      const stat = await pop3.STAT();
      // Format: <count> <size>
      const numMessages = stat.toString().split(' ')[0];

      await pop3.QUIT();

      return numMessages;
    } catch (err) {
      console.log(err);
    }
    return 0;
  }

  // Parse email
  async parseEmail(email: string): Promise<ParsedMail> {
    // Parse email
    const parsed = await simpleParser(email);
    return parsed;
  }

  isValidEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Parse PDF and send content by email
  async parsePDFAttachment(attachmentEntity: EmailMediaEntity, email: ParsedMail) {
    console.log('parsing pdf');
    const result = await PDFService.parsePDF(attachmentEntity.fileContent);
    const config = GetConfig<Pop3Settings>();
    // Send email to sender with data
    const emailService = new EmailServer();
    console.log('sending email with pdf data');

    if (email.from != undefined) {
      const from_email = email.from.value[0].address;

      // Check if email is valid
      if (from_email != undefined && this.isValidEmail(from_email)) {
        await emailService.send({
          from: config.POP3_EMAIL_EMAIL,
          subject: 'PDF Received!',
          to: `${from_email}`,
          html: `<div>
            PDF Received! 
            <div>Info: ${JSON.stringify(result.info)}</div>
            <div>Metadata: ${JSON.stringify(result.metadata)}</div>
            <div>NumPages: ${result.numpages}</div>
            <div>NumRender: ${result.numrender}</div>
            <div>Version: ${result.version}</div>
            <div>Info: ${result.text}</div>
            </div>`,
        });
      }
    }
  }

  // Save email to database
  async saveEmail(email: ParsedMail) {
    // Check if email exist on database
    const emailExist = await EmailHistoryEntity.findOneBy({
      messageId: email.messageId,
    });

    console.log(email.messageId);
    if (emailExist != null) {
      return;
    }
    console.log('processing email');

    // Save email to database
    const emailEntity = new EmailHistoryEntity();
    if (email.from != null) {
      emailEntity.from = email.from?.text;
    }
    if (email.to != null) {
      if (Array.isArray(email.to)) {
        emailEntity.to = email.to.map((x) => x.text).join(',');
      } else {
        emailEntity.to = email.to.text;
      }
    }
    if (email.cc != null) {
      if (Array.isArray(email.cc)) {
        emailEntity.cc = email.cc.map((x) => x.text).join(',');
      } else {
        emailEntity.cc = email.cc.text;
      }
    }

    if (email.bcc != null) {
      if (Array.isArray(email.bcc)) {
        emailEntity.bcc = email.bcc.map((x) => x.text).join(',');
      } else {
        emailEntity.bcc = email.bcc.text;
      }
    }

    if (email.subject != null) {
      emailEntity.subject = email.subject;
    }

    emailEntity.headers = JSON.stringify(email.headers);

    if (email.date != null) {
      emailEntity.date = email.date;
    }

    if (email.messageId != null) {
      emailEntity.messageId = email.messageId;
    }

    if (email.inReplyTo != null) {
      emailEntity.inReplyTo = email.inReplyTo;
    }

    if (email.replyTo != null) {
      emailEntity.replyTo = email.replyTo?.text;
    }

    if (email.references != null) {
      if (Array.isArray(email.references)) {
        emailEntity.references = email.references.map((x) => x).join(',');
      } else {
        emailEntity.references = email.references;
      }
    }

    if (email.html != false) {
      emailEntity.html = email.html;
    }

    if (email.text != undefined) {
      emailEntity.text = email.text;
    }

    if (email.textAsHtml != undefined) {
      emailEntity.textAsHtml = email.textAsHtml;
    }

    // emailEntity.attachments = []

    await PostgresDataSource.manager.save(emailEntity);

    const attachments: EmailMediaEntity[] = [];

    // Save attachments
    if (email.attachments) {
      console.log('proccesing attachments');
      for (let i = 0; i < email.attachments.length; i++) {
        const attachment = email.attachments[i];
        const attachmentEntity = new EmailMediaEntity();

        attachmentEntity.name = attachment.filename || '';

        attachmentEntity.fileName = attachment.filename || '';
        attachmentEntity.fileExt = attachment.filename?.split('.').pop() || '';
        attachmentEntity.fileContent = Buffer.from(attachment.content);
        attachmentEntity.senderTo = emailEntity.to;

        if (attachment.contentId) {
          attachmentEntity.contentId = attachment.contentId;
        }
        attachmentEntity.contentType = attachment.contentType;
        attachmentEntity.size = attachment.size;
        attachmentEntity.email = emailEntity;

        await PostgresDataSource.manager.save(attachmentEntity);
        attachments.push(attachmentEntity);

        if (attachmentEntity.fileExt == 'pdf' && email.from != undefined) {
          await this.parsePDFAttachment(attachmentEntity, email);
        }
      }
    }
  }

  // Read single email from server
  async readEmail(msgNum: number, deleteEmail: boolean = false) {
    var pop3 = new Pop3Command(this.clientOptions);

    // RETR command to get the email
    const resp = await pop3.RETR(msgNum);

    // Parse email
    const email = await this.parseEmail(resp);

    // Save email to database
    await this.saveEmail(email);

    // Delete email from server
    if (deleteEmail) {
      await pop3.DELE(msgNum);
    }

    await pop3.QUIT();

    return email;
  }

  // Read all emails from server
  async readAllEmails() {
    // Get number of messages in the mailbox
    const numMessages = await this.getNumMessages();
    console.log('reading emails', numMessages);

    // Read all emails
    for (let i = 1; i <= numMessages; i++) {
      await this.readEmail(i, false);
    }

    return numMessages;
  }
}

export const readEmails = async (): Promise<number> => {
  // Get host, port, username, password from request
  const config = GetConfig<Pop3Settings>();
  if (config.POP3_EMAIL_HOST == null) {
    throw new Error('POP3_EMAIL_HOST not set');
  }
  const host = config.POP3_EMAIL_HOST;
  if (config.POP3_EMAIL_PORT == null) {
    throw new Error('POP3_EMAIL_PORT not set');
  }
  const port = config.POP3_EMAIL_PORT;
  if (config.POP3_EMAIL_USER == null) {
    throw new Error('POP3_EMAIL_USER not set');
  }
  const username = config.POP3_EMAIL_USER;
  if (config.POP3_EMAIL_PASSWORD == null) {
    throw new Error('POP3_EMAIL_PASSWORD not set');
  }
  const password = config.POP3_EMAIL_PASSWORD;
  if (config.POP3_EMAIL_TLS == null) {
    throw new Error('POP3_EMAIL_TLS not set');
  }
  const tls = config.POP3_EMAIL_TLS;

  if (config.POP3_EMAIL_EMAIL == null) {
    throw new Error('POP3_EMAIL_EMAIL not set');
  }

  const pop3 = new Pop3Service({
    host: host,
    port: port,
    user: username,
    password: password,
    tls: tls,
  });

  const numb = await pop3.readAllEmails();
  return numb;
};

export const loopReadEmails = async () => {
  const numb = await readEmails();
  console.log(numb, 'emails readed!');

  setTimeout(async () => {
    loopReadEmails();
  }, READ_EMAILS_INTERVAL);
};
