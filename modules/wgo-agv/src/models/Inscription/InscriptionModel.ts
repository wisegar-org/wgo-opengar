import { In, Not, Repository } from "typeorm";
import AGVEventEntity from "../../database/entities/AGVEventEntity";
import { AGVInscriptionEntity } from "../../database/entities/AGVInscriptionEntity";
import { AGVInscriptionInput } from "../../resolvers/Inscription/AGVInscriptionInputs";
import { AGVInscriptionResponse } from "../../resolvers/Inscription/AGVInscriptionResponses";
import { IContextBase } from "../../wgo-base/core/models/context";
import { HistoricModel } from "../../wgo-base/historic/models/HistoricModel";
import { AGVEventModel } from "../Event/EventModel";

export class AGVInscriptionModel {
  private inscriptionRepository: Repository<AGVInscriptionEntity>;
  private eventModel: AGVEventModel;
  private historyModel: HistoricModel<AGVInscriptionEntity>;

  /**
   *
   */
  constructor(ctx: IContextBase) {
    this.inscriptionRepository =
      ctx.dataSource.getRepository(AGVInscriptionEntity);
    this.eventModel = new AGVEventModel(ctx);
    this.historyModel = new HistoricModel(AGVInscriptionEntity, ctx);
  }

  public async all(): Promise<AGVInscriptionResponse[]> {
    const inscriptions = await this.inscriptionRepository.find({
      relations: ["event"],
    });

    const inscriptionList: AGVInscriptionResponse[] = [];
    inscriptions.map((inscrpt) => {
      inscriptionList.push(<AGVInscriptionResponse>{
        id: inscrpt.id,
        nome: inscrpt.nome,
        cognome: inscrpt.cognome,
        email: inscrpt.email,
        phone: inscrpt.phone,
        message: inscrpt.message,
        class: inscrpt.class,
        eventId: inscrpt.event.id,
        eventTitle: inscrpt.event.title,
        eventClass: inscrpt.event.class,
        date: inscrpt.inscriptionDate,
      });
    });
    return inscriptionList;
  }

  public async allByCriteria(criteria: any) {
    const inscriptions = await this.inscriptionRepository.find({
      where: criteria,
    });

    return inscriptions;
  }

  public async create(agvInscription: AGVInscriptionInput): Promise<any> {
    const entityResult = await this.inscriptionRepository.findOne({
      where: {
        nome: agvInscription.nome,
        cognome: agvInscription.cognome,
        email: agvInscription.email,
        phone: agvInscription.phone,
        class: agvInscription.class,
        eventId: agvInscription.eventId,
      },
    });
    if (entityResult) {
      return { exist: true };
    }
    const inscription = new AGVInscriptionEntity();
    inscription.nome = agvInscription.nome;
    inscription.cognome = agvInscription.cognome;
    inscription.email = agvInscription.email;
    inscription.phone = agvInscription.phone;
    inscription.message = agvInscription.message;
    inscription.class = agvInscription.class;

    if (agvInscription.eventId) {
      inscription.event = (await this.eventModel.getEvent(
        agvInscription.eventId,
        "",
        false
      )) as AGVEventEntity;
    }
    const result = await this.inscriptionRepository.manager.save(inscription);
    return { create: !!result, error: !result };
  }
}
