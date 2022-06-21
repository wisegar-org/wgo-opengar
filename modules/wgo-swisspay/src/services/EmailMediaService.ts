import { DataSource, Like } from 'typeorm';
import { EmailHistoryEntity } from '../database/entities/EmailHistoryEntity';
import { EmailMediaEntity } from '../database/entities/EmailMediaEntity';
import { IIdInput } from '../models';
import { IEmailDetailsModel, IEmailMediaFilter, IEmailMediaModel, IEmailModel } from '../models/EmailModel';

export class EmailMediaService {
  dataSource: DataSource;

  /**
   *
   */
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getAllEmails(filter: IEmailMediaFilter) {
    const repo = await this.dataSource.getRepository(EmailMediaEntity);
    const emailList = await repo.find({
      where: [
        {
          senderTo: Like(`%${filter.email}%`),
        },
        {
          email: [
            {
              from: Like(`%${filter.email}%`),
            },
            {
              to: Like(`%${filter.email}%`),
            },
          ],
        },
      ],
      relations: ['email'],
    });

    return emailList.map((email) => this.mapEmailMediaEntity(email));
  }

  async getEmailMediaById(data: IIdInput, ctx: any) {
    const repo = await this.dataSource.getRepository(EmailMediaEntity);
    const idQuery = { id: data.id };
    const emailResponse = await repo.findOne({
      relations: ['email', 'email.attachments'],
      where: [
        {
          ...idQuery,
          senderTo: Like(`%${ctx.user.email}%`),
        },
        {
          ...idQuery,
          email: {
            from: Like(`%${ctx.user.email}%`),
          },
        },
        {
          ...idQuery,
          email: {
            to: Like(`%${ctx.user.email}%`),
          },
        },
      ],
    });

    if (!!emailResponse) {
      const emailMedia = this.mapEmailMediaEntity(emailResponse);
      const email = this.mapEmailHistoryEntity(emailResponse.email);
      return {
        email,
        emailMedia,
      } as IEmailDetailsModel;
    }

    throw new Error("Email don't exist");
  }

  async getEmailById(data: IIdInput) {
    const repo = await this.dataSource.getRepository(EmailHistoryEntity);
    const email = await repo.findOne({
      relations: ['attachments'],
      where: {
        id: data.id,
      },
    });

    if (!!email) {
      return this.mapEmailHistoryEntity(email);
    }

    throw new Error("Email don't exist");
  }

  private mapEmailMediaEntity(emailMedia: EmailMediaEntity, emailId: number = 0): IEmailMediaModel {
    return {
      id: emailMedia.id,
      name: emailMedia.name,
      senderTo: emailMedia.senderTo,
      fileName: emailMedia.fileName,
      fileExt: emailMedia.fileExt,
      isPublic: emailMedia.isPublic,
      contentId: emailMedia.contentId,
      contentType: emailMedia.contentType,
      size: emailMedia.size,
      emailId: emailMedia.email?.id || emailId,
    } as IEmailMediaModel;
  }

  private mapEmailHistoryEntity(email: EmailHistoryEntity): IEmailModel {
    const attachments = (email.attachments || []).map((attch) => this.mapEmailMediaEntity(attch, email.id));
    return {
      id: email.id,
      from: email.from,
      to: email.to,
      cc: email.cc,
      bcc: email.bcc,
      subject: email.subject,
      headers: email.headers,
      date: email.date,
      messageId: email.messageId,
      inReplyTo: email.inReplyTo,
      replyTo: email.replyTo,
      references: email.references,
      html: email.html,
      text: email.text,
      textAsHtml: email.textAsHtml,
      attachments,
    } as IEmailModel;
  }
}
