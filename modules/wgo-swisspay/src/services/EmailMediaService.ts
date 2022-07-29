import { DataSource, Like } from 'typeorm';
import { IIdInput } from '../wgo-base/core/models';
import { UtilService } from '../wgo-base/core/services/UtilService';
import { EmailHistoryEntity } from '../database/entities/EmailHistoryEntity';
import { EmailMediaEntity } from '../database/entities/EmailMediaEntity';
import { WRONG_EMAIL_DONT_EXIST } from '../models/EmailMedia/constants';
import { IEmailDetailsModel, IEmailMediaFilter, IEmailMediaModel, IEmailModel } from '../models/EmailModel';
import { IEmployeeDocumentProps } from '../models/EmployeesModel';
import PDFService from './PDFService';
import { UserResponse } from '../wgo-base/authentication/resolvers/AuthResponses';

export class EmailMediaService {
  dataSource: DataSource;

  /**
   *
   */
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getAllEmails(filter: IEmailMediaFilter, ctx: any) {
    const repo = await this.dataSource.getRepository(EmailMediaEntity);
    const whereParam = ctx.user.isSuperAdmin
      ? {}
      : {
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
        };

    const emailList = await repo.find({
      ...whereParam,
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

    throw new Error(WRONG_EMAIL_DONT_EXIST);
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

    throw new Error(WRONG_EMAIL_DONT_EXIST);
  }

  async addMediaByEmail(file: Promise<unknown>, to: UserResponse, from: UserResponse) {
    const fileInput = await file;
    const { createReadStream, filename, mimetype, encoding } = fileInput as any;
    const stream: any = createReadStream();
    const fileContent = (await UtilService.readStreamData(stream)) as Buffer;

    const result = await PDFService.parsePDF(fileContent);

    const emailHistoryRepo = this.dataSource.getRepository(EmailHistoryEntity);
    let emailHistory = new EmailHistoryEntity();
    emailHistory.to = to.email;
    emailHistory.from = from.email;
    emailHistory = await emailHistoryRepo.save(emailHistory);

    const emailMediaRepo = this.dataSource.getRepository(EmailMediaEntity);
    const emailMedia = new EmailMediaEntity();
    emailMedia.contentType = mimetype;
    emailMedia.size = Buffer.byteLength(fileContent);
    emailMedia.name = filename;
    emailMedia.fileName = filename;
    emailMedia.fileContent = Buffer.from(Buffer.from(fileContent, encoding).toString('base64'));
    emailMedia.fileExt = 'pdf';
    emailMedia.senderTo = to.email;
    emailMedia.email = emailHistory;
    await emailMediaRepo.save(emailMedia);

    return { data: result, fileName: emailMedia.fileName, size: emailMedia.size } as IEmployeeDocumentProps;
  }

  private mapEmailMediaEntity(emailMedia: EmailMediaEntity, emailId: number = 0): IEmailMediaModel {
    return {
      id: emailMedia.id,
      name: emailMedia.name,
      senderTo: emailMedia.senderTo || emailMedia.email?.to || '',
      senderFrom: emailMedia.email?.from || '',
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
    const attachments = (email.attachments || []).map((attch) =>
      this.mapEmailMediaEntity({ ...attch, email: email } as any, email.id)
    );
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
