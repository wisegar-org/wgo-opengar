import { EmailModel, AttachmentModel } from './../models/EmailModel';
import {
  EmailHistoryEntity
} from "./../database/entities/EmailHistoryEntity";
import {
  EmailMediaEntity } from './../database/entities/EmailMediaEntity';
import { PostgresDataSource } from './../../dataSources';

import { IPop3ConnectionOptions, Pop3Command } from '@wisegar-org/wgo-pop3'
import { Buffer } from "buffer";

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
      const numMessages = stat.toString().split(" ")[0];
      
      await pop3.QUIT();
      
      return numMessages;
    }
    catch (err) {
      console.log(err);
    }
    return 0

  }

  // Parse email
  async parseEmail(email: string) : Promise<EmailModel> {
    const result = new EmailModel();

    // Split email into lines
    const lines = email.split("\r\n");

    // Parse headers
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if line is a header
      if (line.startsWith("From: ")) {
        result.from = line.replace("From: ", "");
      } else if (line.startsWith("To: ")) {
        result.to = line.replace("To: ", "");
      } else if (line.startsWith("Cc: ")) {
        result.cc = line.replace("Cc: ", "");
      } else if (line.startsWith("Bcc: ")) {
        result.bcc = line.replace("Bcc: ", "");
      } else if (line.startsWith("Subject: ")) {
        result.subject = line.replace("Subject: ", "");
      } else if (line.startsWith("Date: ") && result.date == null) { // Only parse date once
        result.date = new Date(line.replace("Date: ", ""));
      } else if (line.startsWith("Message-ID: ")) {
        result.messageId = line.replace("Message-ID: ", "");
      } else if (line.startsWith("In-Reply-To: ")) {
        result.inReplyTo = line.replace("In-Reply-To: ", "");
      } else if (line.startsWith("References: ")) {
        result.references = line.replace("References: ", "");
      } else if (line.startsWith("Reply-To: ")) {
        result.replyTo = line.replace("Reply-To: ", "");
      } else if (line.startsWith("Content-Type: ") && result.contentType == null) { // Only parse first content type
        result.contentType = line.replace("Content-Type: ", "");
      } else if(line.startsWith(" boundary=")) {
        result.boundary = line.replace(" boundary=", "");
        result.boundary = result.boundary.replace(/\"/g, "");
      }

      // Faltantes
      // result.text ok
      // result.attachments ok
      // result.headers
      // result.html
      // result.id
      // result.textAsHtml

    }

    return result;

  }

  // Parse attachment
  async parseAttachment(lines: string[], boundary: string, i: number) {
    // Parse attachment
    const attachment = new AttachmentModel();
    var parseBody = false;
    // Parse headers
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j];
      // Check if line is a header
      if (line.startsWith("--" + boundary)) {
        // End of attachment
        return attachment;
      } else {
        if (line.startsWith("Content-Type: ")) {
          attachment.contentType = line.replace("Content-Type: ", "");
        } else if (line.startsWith("Content-Transfer-Encoding: ")) {
          attachment.contentTransferEncoding = line.replace(
            "Content-Transfer-Encoding: ",
            ""
          );
        } else if (line.startsWith("Content-Disposition: ")) {
          attachment.contentDisposition = line.replace(
            "Content-Disposition: ",
            ""
          );
        } else if (line.startsWith("Content-Description: ")) {
          attachment.contentDescription = line.replace(
            "Content-Description: ",
            ""
          );
        } else if (line.startsWith("Content-ID: ")) {
          // Skip
        } else if (line.startsWith("MIME-Version: ")) {
          // Skip
        } else if (line.startsWith("X-Priority: ")) {
          // Skip
        } else if (line.startsWith("X-MSMail-Priority: ")) {
          // Skip
        } else if (line.startsWith("X-Mailer: ")) {
          // Skip
        } else if (line.startsWith("X-MimeOLE: ")) {
          // Skip
        } else if (line.startsWith("X-Originating-IP: ")) {
          // Skip
        } else if (line.startsWith("X-MS-Has-Attach: ")) {
          // Skip
        } else if (line == "") {
          parseBody = true
        } else if (parseBody) {
          // Parse attachment body
          if(attachment.content == null) {
            attachment.content = line;
          }
          else {
            attachment.content += line;
          }
        }
      }
    }
    return attachment
  }

  // Parse attachments
  async parseAttachments(email: string, boundary: string) {
    // Split email into lines
    const lines = email.split("\r\n");

    const attachments: AttachmentModel[] = [];

    // Search for boundary
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if line is a header
      if (line.startsWith("--" + boundary)) {
        // Check if line is a header
        if (line.startsWith("--" + boundary + "--")) {
          // End of attachments
          return attachments;
        } else {
          // Parse attachment
          const attachment = await this.parseAttachment(lines, boundary, i);
          attachments.push(attachment);
        }
      }
    }

    return attachments;
  }

  // Save email to database
  async saveEmail(email: EmailModel) {
    // Check if email exist on database
    const emailExist = await EmailHistoryEntity.findOneBy({
      messageId: email.messageId
    });

    if(emailExist != null) {
      return;
    }

    // Save email to database
    const emailEntity = new EmailHistoryEntity();
    emailEntity.from = email.from;
    emailEntity.to = email.to;
    emailEntity.cc = email.cc;
    emailEntity.bcc = email.bcc;
    emailEntity.subject = email.subject;
    emailEntity.date = email.date;
    emailEntity.messageId = email.messageId;
    emailEntity.inReplyTo = email.inReplyTo;
    emailEntity.references = email.references;
    emailEntity.replyTo = email.replyTo;
    emailEntity.headers = email.headers;
    emailEntity.html = email.html;
    emailEntity.id = email.id;
    emailEntity.text = email.text;
    emailEntity.textAsHtml = email.textAsHtml;
    
    await PostgresDataSource.manager.save(emailEntity);

    const attachments : EmailMediaEntity[] = [];

    // Save attachments
    if(email.attachments) {
      for (let i = 0; i < email.attachments.length; i++) {
        const attachment = email.attachments[i];
        const attachmentEntity = new EmailMediaEntity();
        attachmentEntity.contentType = attachment.contentType;
        // attachmentEntity.contentTransferEncoding = attachment.contentTransferEncoding;
        // attachmentEntity.contentDisposition = attachment.contentDisposition;
        // attachmentEntity.contentDescription = attachment.contentDescription;
        attachmentEntity.fileContent = Buffer.from(attachment.content);
        attachmentEntity.email = emailEntity;
        
        await PostgresDataSource.manager.save(attachmentEntity);
        attachments.push(attachmentEntity);
      }
    }
    emailEntity.attachments = attachments;
    await PostgresDataSource.manager.save(emailEntity);
  }

  // Read single email from server
  async readEmail(msgNum: number, deleteEmail: boolean = false) {
    var pop3 = new Pop3Command(this.clientOptions);
    
    // RETR command to get the email
    const resp = await pop3.RETR(msgNum);

    // Parse email
    const email = await this.parseEmail(resp);

    // Check attachments
    if (email.contentType.includes("multipart")) {
      // Get boundary
      const boundary = email.boundary;
      
      // Save attachments
      const attachments = await this.parseAttachments(resp, boundary);
      
      if(attachments != null) {
        const body = attachments.shift();
        if(body != null) {
          email.text = body.content;
        }
        email.attachments = attachments;
    }
    }
    
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
    // var pop3 = new Pop3Command(this.clientOptions);

    // Get number of messages in the mailbox
    const numMessages = await this.getNumMessages();
    console.log('reading emails', numMessages);

    // Read all emails
    for (let i = 1; i <= numMessages; i++) {
      await this.readEmail(i, false);
    }

    // await pop3.QUIT();

    return numMessages;
  }
}
