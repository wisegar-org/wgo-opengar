import { Connection, Repository } from 'typeorm';
import { AGVInscriptionEntity } from '../database/entities/AGVInscriptionEntity';
import { AGVInscriptionInput } from '../modules/agvInscription/AGVInscriptionInputs';
import { AGVInscriptionResponse } from '../modules/agvInscription/AGVInscriptionResponses';
import { AGVEventService } from './AGVEventService';

export class AGVInscriptionService {
  private inscriptionRepository: Repository<AGVInscriptionEntity>;
  private eventService: AGVEventService;

  /**
   *
   */
  constructor(conn: Connection) {
    this.inscriptionRepository = conn.getRepository(AGVInscriptionEntity);
    this.eventService = new AGVEventService(conn);
  }

  public async all(): Promise<AGVInscriptionResponse[]> {
    const inscriptions = await this.inscriptionRepository.find({
      relations: ['event'],
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
        eventId: inscrpt.event.id,
        eventTitle: inscrpt.event.title,
        eventClass: inscrpt.event.class,
        date: inscrpt.inscriptionDate,
      });
    });
    return inscriptionList;
  }

  public async create(agvInscription: AGVInscriptionInput): Promise<Boolean> {
    const inscription = new AGVInscriptionEntity();
    inscription.nome = agvInscription.nome;
    inscription.cognome = agvInscription.cognome;
    inscription.email = agvInscription.email;
    inscription.phone = agvInscription.phone;
    inscription.message = agvInscription.message;

    if (agvInscription.eventId) {
      inscription.event = await this.eventService.getEvent(agvInscription.eventId);
    }
    return !!(await this.inscriptionRepository.manager.save(inscription));
  }
}
