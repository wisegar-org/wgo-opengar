import { Connection, Repository } from 'typeorm';
import { MediaModel } from '../../../models/MediaModel';
import AGVEventEntity from '../database/entities/AGVEventEntity';
import { EventStateEnum, EventTypeEnum } from '../models';
import { AGVEnventInput } from '../modules/agvEvent/AGVEventInputs';
import { AGVEventResponse } from '../modules/agvEvent/AGVEventResponses';

export class AGVEventService {
  private eventRepository: Repository<AGVEventEntity>;
  private mediaModel: MediaModel;

  /**
   *
   */
  constructor(conn: Connection) {
    this.eventRepository = conn.getRepository(AGVEventEntity);
    this.mediaModel = new MediaModel();
  }

  public async all(): Promise<AGVEventResponse[]> {
    const events = await this.eventRepository.find({
      relations: ['imgTitle', 'imgList'],
      order: { id: 'DESC' },
    });

    const eventResponses: AGVEventResponse[] = [];
    events.map((evnt) => {
      eventResponses.push({ ...new AGVEventResponse(), ...evnt });
    });

    return eventResponses;
  }

  public async create(agvEvent: AGVEnventInput): Promise<Boolean> {
    let evnt = new AGVEventEntity();
    evnt = await this.setEventProperties(evnt, agvEvent);
    return !!evnt;
  }

  public async modify(agvEvent: AGVEnventInput): Promise<Boolean> {
    let evnt = await this.eventRepository.findOne(agvEvent.id);
    if (evnt) evnt = await this.setEventProperties(evnt, agvEvent);
    return !!evnt;
  }

  private async setEventProperties(evnt: AGVEventEntity, agvEvent: AGVEnventInput) {
    evnt.class = agvEvent.class;
    evnt.description = agvEvent.description;
    evnt.endDate = agvEvent.endDate;
    evnt.enrollment = agvEvent.enrollment;
    evnt.shortDescription = agvEvent.shortDescription;
    evnt.startDate = agvEvent.startDate;
    evnt.state = agvEvent.state as EventStateEnum;
    evnt.title = agvEvent.title;
    evnt.type = agvEvent.type as EventTypeEnum;
    evnt.visible = agvEvent.visible;

    const mediaTitle = agvEvent.imgTitle ? await this.mediaModel.getMediaList([agvEvent.imgTitle]) : null;
    if (mediaTitle && mediaTitle.length > 0) {
      evnt.imgTitle = mediaTitle[0];
    }

    const mediaList = agvEvent.imgList ? await this.mediaModel.getMediaList(agvEvent.imgList) : null;
    if (mediaList) {
      evnt.imgList = mediaList;
    }

    return await this.eventRepository.manager.save(evnt);
  }
}
