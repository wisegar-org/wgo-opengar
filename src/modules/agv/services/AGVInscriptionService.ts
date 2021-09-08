import { Connection, Repository } from 'typeorm';
import { AGVInscriptionEntity } from '../database/entities/AGVInscriptionEntity';
import { AGVInscriptionInput } from '../modules/agvInscription/AGVInscriptionInputs';
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

  public async create(agvInscription: AGVInscriptionInput): Promise<Boolean> {
    let inscription = await this.inscriptionRepository.findOne({
      eventId: agvInscription.eventId,
      email: agvInscription.email,
    });
    if (!!inscription) return false;

    inscription = new AGVInscriptionEntity();
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
