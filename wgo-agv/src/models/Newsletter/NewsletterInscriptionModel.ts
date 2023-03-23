import {
  GetConfig,
  GetEmailSenderKey,
  GetEmailSenderNameKey,
} from "@wisegar-org/wgo-settings";
import { Repository, ILike, Not, In } from "typeorm";
import { AGVNewsletterInscriptionEntity } from "../../database/entities/AGVNewsletterInscriptionEntity";
import { IContextBase } from "@wisegar-org/wgo-base-models";
import {
  EmailModel,
  getInlineStyle,
  HistoricModel,
  HandlebarsTemplateModel,
  TemplateModel,
} from "@wisegar-org/wgo-base-server";
import { AGVNewsletterInscriptionStatusEnum } from "../enums";
import { AGVInscriptionModel } from "../Inscription/InscriptionModel";
import {
  INewsletterInscriptionInput,
  INewsletterInscriptionModel,
  INewsletterInscriptionPageInput,
} from "../newsletterModels";

export class AGVNewsletterInscriptionModel {
  private repository: Repository<AGVNewsletterInscriptionEntity>;
  private historicModel: HistoricModel<AGVNewsletterInscriptionEntity>;
  private emailModel: EmailModel;
  private inscriptionModel: AGVInscriptionModel;
  private templateModel: TemplateModel;
  private handlebardModel: HandlebarsTemplateModel;
  /**
   *
   */
  constructor(ctx: IContextBase) {
    this.repository = ctx.dataSource.getRepository(
      AGVNewsletterInscriptionEntity
    );
    this.historicModel = new HistoricModel(AGVNewsletterInscriptionEntity, ctx);
    this.emailModel = new EmailModel(ctx);
    this.inscriptionModel = new AGVInscriptionModel(ctx);
    this.templateModel = new TemplateModel(ctx);
    this.handlebardModel = new HandlebarsTemplateModel();
  }

  async getInscriptionPage(data: INewsletterInscriptionPageInput) {
    const filter: { [key: string]: any } = {};
    if (data.filter?.email) filter.email = ILike(`%${data.filter.email}%`);
    if (data.filter?.status) filter.status = data.filter.status;

    const order = data.sortBy
      ? { [data.sortBy]: data.descending ? "DESC" : "ASC" }
      : { id: "DESC" };
    const result = await this.getInscriptionPageByCriteria(
      filter,
      order,
      data.skip,
      data.take
    );
    return {
      inscriptions: result[0].map((item) =>
        AGVNewsletterInscriptionModel.ParseInscriptionResponse(item)
      ),
      count: result[1],
    };
  }

  public async getInscriptionPageByCriteria(
    whereQuery: any,
    orderQuery: any,
    skip: number,
    take: number
  ) {
    const inscriptions = await this.repository.findAndCount({
      where: whereQuery,
      order: orderQuery,
      skip,
      take,
    });
    return inscriptions;
  }

  public async getInscriptionsByCriteria(whereQuery: any) {
    const inscriptions = await this.repository.find({ where: whereQuery });
    return inscriptions;
  }

  public async getInscriptionByEmail(email: string) {
    const entityResult = await this.repository.findOne({ where: { email } });
    return entityResult;
  }

  async addInscription(inscription: INewsletterInscriptionInput, time = 0) {
    const entityResult = await this.getInscriptionByEmail(inscription.email);
    if (entityResult) return false;
    const entity = new AGVNewsletterInscriptionEntity();
    entity.email = inscription.email;
    entity.status = inscription.status;
    const result = await this.repository.manager.save(entity);
    if (result) await this.historicModel.createPostHistoric(result);
    return !!result;
  }

  async editInscription(inscription: INewsletterInscriptionModel) {
    const entity = await this.repository.findOne({
      where: {
        id: inscription.id,
      },
    });
    if (entity) {
      entity.email = inscription.email;
      entity.status = inscription.status;
      const result = await this.repository.manager.save(entity);
      if (result) await this.historicModel.createPutHistoric(result);
      return !!result;
    }

    return false;
  }

  async deleteInscription(idInput: number) {
    const entity = await this.repository.findOne({
      where: {
        id: idInput,
      },
    });
    if (entity) {
      const result = await this.repository.delete(entity.id);
      if (result) {
        await this.historicModel.createDeleteHardHistoric(entity);
        return true;
      }
    }
    return false;
  }

  async sendInscriptionEmail(email: string, msg: string, time = 0) {
    const config = GetConfig<any>();
    const url = config.HOST_BASE;
    const linkConfirmation = `${url}/subscription?email=${email}`;
    const data = {
      url,
      email,
      linkDiConferma: linkConfirmation,
    };
    let body = this.handlebardModel.getTemplateData(msg, data);
    body = await getInlineStyle(body);
    body = body.split("&lt;").join("<").split("&gt;").join(">");
    const params = {
      subject: "Collettivo dell'Assemblea Genitori di Vezia",
      to: email,
      from: `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`,
      html: body,
    };
    if (time === 0) {
      const result = await this.emailModel.sendEmail(params);
      return result.isSuccess;
    } else {
      setTimeout(async () => {
        await this.emailModel.sendEmail(params);
      }, 30 * time);
      return true;
    }
  }

  static ParseInscriptionResponse(inscription: AGVNewsletterInscriptionEntity) {
    return {
      id: inscription.id,
      email: inscription.email,
      status: inscription.status,
    };
  }

  async zyncInscriptions() {
    const inscriptions = await this.getInscriptionsByCriteria({});
    const inscriptionEmails = inscriptions.map((item) => item.email);
    const eventInscriptions = await this.inscriptionModel.allByCriteria({
      email: Not(In(inscriptionEmails)),
    });

    const emailsInscriptions: { [key: string]: any } = {};
    eventInscriptions.forEach((eventInsc) => {
      emailsInscriptions[eventInsc.email] = true;
    });
    for (const email of Object.keys(emailsInscriptions)) {
      await this.addInscription({
        email: email,
        status: AGVNewsletterInscriptionStatusEnum.Waiting,
      });
    }

    return true;
  }

  async resendStatusInscription(emails: string[]) {
    const criteria =
      emails.length > 0
        ? {
            email: In(emails),
          }
        : {
            status: AGVNewsletterInscriptionStatusEnum.Waiting,
          };
    const inscriptions = await this.getInscriptionsByCriteria(criteria);
    const templatePending = await this.templateModel.getTemplateByType(
      this.getKeyData(AGVNewsletterInscriptionStatusEnum.Waiting)
    );
    const templateConfirmed = await this.templateModel.getTemplateByType(
      this.getKeyData(AGVNewsletterInscriptionStatusEnum.Confirmed)
    );
    const templateCancelled = await this.templateModel.getTemplateByType(
      this.getKeyData(AGVNewsletterInscriptionStatusEnum.Cancelled)
    );
    const templates = {
      pending: templatePending?.body || "",
      confirmed: templateConfirmed?.body || "",
      cancelled: templateCancelled?.body || "",
    };
    let index = 1;
    for (const inscription of inscriptions) {
      await this.sendInscriptionEmail(
        inscription.email,
        this.getBodyDataByKey(inscription.status, templates),
        index
      );
      index++;
    }
    return true;
  }

  getKeyData(status: string) {
    return `AGV_TEMPLATE_DATA_NEWSLETTER_${status
      .split(" ")
      .join("")}`.toUpperCase();
  }

  getBodyDataByKey(
    status: string,
    data: { pending: string; confirmed: string; cancelled: string }
  ) {
    switch (status) {
      case AGVNewsletterInscriptionStatusEnum.Waiting:
        return data.pending;
      case AGVNewsletterInscriptionStatusEnum.Confirmed:
        return data.confirmed;
      case AGVNewsletterInscriptionStatusEnum.Cancelled:
        return data.cancelled;
      default: {
        return data.pending;
      }
    }
  }
}
